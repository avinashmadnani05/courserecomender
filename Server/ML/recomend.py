import os
import sys
import pandas as pd
import numpy as np
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense
from sklearn.preprocessing import MinMaxScaler

# Set terminal encoding to handle Unicode characters (for Windows)
sys.stdout.reconfigure(encoding='utf-8')

# Disable TensorFlow optimizations for certain CPU features
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['recom']

# Retrieve data from MongoDB collections
courses_collection = db['courses']
users_collection = db['users']

# Convert the data to Pandas DataFrames
courses_df = pd.DataFrame(list(courses_collection.find()))
users_df = pd.DataFrame(list(users_collection.find()))

# Drop the '_id' field if it exists
if '_id' in courses_df.columns:
    courses_df = courses_df.drop(columns=['_id'])
if '_id' in users_df.columns:
    users_df = users_df.drop(columns=['_id'])

# Create a user-course interaction matrix
def create_interaction_matrix(users_df, courses_df):
    interaction_matrix = pd.DataFrame(index=users_df['userId'], columns=courses_df['course_id']).fillna(0)
    
    interaction_matrix = interaction_matrix.infer_objects(copy=False)
    
    for index, row in users_df.iterrows():
        interests = row['interests'].split()  
        for course_id in courses_df['course_id']:
            if any(tag in interests for tag in courses_df[courses_df['course_id'] == course_id]['tags'].values[0].split()):
                interaction_matrix.loc[row['userId'], course_id] = 1
    return interaction_matrix

# Create interaction matrix
interaction_matrix = create_interaction_matrix(users_df, courses_df)

# Prepare the data for the autoencoder
X = interaction_matrix.values
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Check the number of samples
n_samples = X_scaled.shape[0]

if n_samples > 1:
    X_train, X_test = train_test_split(X_scaled, test_size=0.2, random_state=42)
else:
    X_train = X_scaled
    X_test = X_scaled

# Define the autoencoder model
input_layer = Input(shape=(X_train.shape[1],))
encoded = Dense(128, activation='relu')(input_layer)
encoded = Dense(64, activation='relu')(encoded)
encoded = Dense(32, activation='relu')(encoded)

decoded = Dense(64, activation='relu')(encoded)
decoded = Dense(128, activation='relu')(decoded)
decoded = Dense(X_train.shape[1], activation='sigmoid')(decoded)

autoencoder = Model(input_layer, decoded)
autoencoder.compile(optimizer='adam', loss='binary_crossentropy')

# Train the autoencoder
autoencoder.fit(X_train, X_train, epochs=50, batch_size=256, shuffle=True, validation_data=(X_test, X_test))

# Make predictions on the user-item interaction matrix
predictions = autoencoder.predict(X_scaled)
predictions = scaler.inverse_transform(predictions)

# Function to recommend courses using the trained autoencoder
def recommend_courses(user_id, num_recs=10):
    user_index = users_df[users_df['userId'] == user_id].index[0]
    user_pred_ratings = predictions[user_index]
    course_ids_sorted = np.argsort(user_pred_ratings)[::-1]

    top_recommendations = []
    for idx in course_ids_sorted[:num_recs]:
        course_id = courses_df.iloc[idx]['course_id']
        course_data = courses_df[courses_df['course_id'] == course_id].iloc[0]
        top_recommendations.append({
            'courseId': int(course_id),
            'description': course_data['description'],
            'link': course_data['link']
        })
    
    return top_recommendations

# Test the recommender for a specific user
user_id = 1
recommended_courses = recommend_courses(user_id=user_id, num_recs=10)

print("Recommended Courses:")
for i, course in enumerate(recommended_courses):
    print(f"{i+1}. {course['description']} (Course ID: {course['courseId']}, Link: {course['link']})")

# Save the recommended courses to MongoDB
def save_recommendations_to_mongo(user_id, recommendations):
    try:
        recommendations_data = {
            "user_id": user_id,
            "recommendations": recommendations
        }

        recommendations_collection = db['recommendations']

        result = recommendations_collection.update_one(
            {"user_id": user_id},
            {"$set": recommendations_data},
            upsert=True
        )

        if result.matched_count:
            print(f"Updated recommendations for user_id {user_id}.")
        else:
            print(f"Inserted new recommendations for user_id {user_id}.")

    except Exception as e:
        print(f"An error occurred while saving recommendations: {e}")

# Save the recommended courses to MongoDB
save_recommendations_to_mongo(user_id=user_id, recommendations=recommended_courses)

# Close the MongoDB connection
client.close()
