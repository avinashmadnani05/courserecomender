import pandas as pd
from surprise import KNNWithMeans, Dataset, Reader
from surprise.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['recom']

# Retrieve data from the MongoDB collections
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
    for index, row in users_df.iterrows():
        interests = row['interests'].split()  # Split the interests string into a list
        for course_id in courses_df['course_id']:
            if any(tag in interests for tag in courses_df[courses_df['course_id'] == course_id]['tags'].values[0].split(',')):
                interaction_matrix.loc[row['userId'], course_id] = 1
            else:
                interaction_matrix.loc[row['userId'], course_id] = 0
    return interaction_matrix

# Create interaction matrix
interaction_matrix = create_interaction_matrix(users_df, courses_df)

# Create a Pandas DataFrame from the interaction matrix
ratings_df = interaction_matrix.stack().reset_index()
ratings_df.columns = ['userId', 'course_id', 'rating']

# Create a Dataset object from the ratings DataFrame (Ensure rating scale is binary)
reader = Reader(rating_scale=(0, 1))
data = Dataset.load_from_df(ratings_df[['userId', 'course_id', 'rating']], reader)

# Split the data into training and testing sets
trainset, testset = train_test_split(data, test_size=0.2)

# Build a collaborative filtering model using KNNWithMeans
sim_options = {'name': 'msd', 'user_based': False}  # Changed to 'msd' for better stability
algo = KNNWithMeans(k=10, sim_options=sim_options)  # Reduced k value to 10
try:
    algo.fit(trainset)
except ZeroDivisionError:
    print("Error in computing similarities due to zero division. Please check the data.")

# Build a content-based filtering model using TF-IDF and cosine similarity
vectorizer = TfidfVectorizer()
vectorizer.fit(courses_df['description'])  # Fit the vectorizer to the course descriptions
course_vectors = vectorizer.transform(courses_df['description'])

# Enhanced hybrid recommendation function
def enhanced_hybrid_recommend(user_id, num_recs=10):
    # Get user data for interest, experience, and skills matching
    user_data = users_df[users_df['userId'] == user_id].iloc[0]
    user_interests = user_data['interests'].split()  # Split interests into a list
    user_experience = user_data['pastExperience'].split()  # Split past experiences into a list
    user_skills = user_data['skills'].split()  # Split skills into a list

    # Create dictionaries to hold scores
    predicted_ratings_cf = {}
    predicted_ratings_cbf = {}

    # Collaborative Filtering Predictions
    for course_id in courses_df['course_id']:
        predicted_rating = algo.predict(user_id, course_id).est
        predicted_ratings_cf[course_id] = predicted_rating

    # Content-Based Filtering Predictions
    user_interest_vector = vectorizer.transform([' '.join(user_interests)])

    for index, course_id in enumerate(courses_df['course_id']):
        course_description = courses_df.loc[index, 'description']
        course_tags = courses_df.loc[index, 'tags'].split(',')

        course_vector = vectorizer.transform([course_description])

        # Calculate cosine similarity for user interests
        similarity_interest = cosine_similarity(user_interest_vector, course_vector).flatten()[0]

        # Adjust the score based on the number of relevant matches in tags
        tag_match = sum(1 for tag in course_tags if tag.strip() in user_interests)

        # Increase score if the course is highly relevant to interests
        predicted_ratings_cbf[course_id] = similarity_interest + (tag_match * 0.3)  # Boost based on tag relevance

    # Combine predictions with a focus on user experience and skills
    predicted_ratings = {}
    for course_id in courses_df['course_id']:
        predicted_cf = predicted_ratings_cf[course_id]
        predicted_cbf = predicted_ratings_cbf.get(course_id, 0)  # Default to 0 if not found

        # Apply weights, emphasizing collaborative filtering for relevant courses
        weight_cf = 0.5  # Weight for collaborative filtering
        weight_cbf = 0.5  # Weight for content-based filtering

        predicted_rating = (weight_cf * predicted_cf) + (weight_cbf * predicted_cbf)
        predicted_ratings[course_id] = predicted_rating

    # Sort and return top-N recommendations based on refined scores
    top_recommendations = sorted(predicted_ratings, key=predicted_ratings.get, reverse=True)[:num_recs]
    return top_recommendations

# Test the enhanced recommender for the specific user
recommended_courses = enhanced_hybrid_recommend(user_id=1, num_recs=10)

# Print the recommended courses
print("Recommended Courses:")
for i, course_id in enumerate(recommended_courses):
    course_data = courses_df[courses_df['course_id'] == course_id].iloc[0]
    print(f"{i+1}. {course_data['description']} (Course ID: {course_id})")

# Save recommendations to MongoDB
def save_recommendations_to_mongo(user_id, recommendations):
    recommendations_collection = db['recommendations']

    recommended_courses_details = []
    for i, course_id in enumerate(recommendations):
        # Fetch course details for the given course_id
        course_data = courses_df[courses_df['course_id'] == course_id]

        # Check if course_data exists and is valid
        if not course_data.empty:
            course_data = course_data.iloc[0]
            course_description = course_data['description']
            course_link = course_data['link']  # Assuming link is a field in your database
            recommended_courses_details.append({
                'courseId': course_id,
                'description': course_description,
                'link': course_link,  # Include the course link
                'rank': i + 1
            })
        else:
            print(f"Course ID {course_id} not found in database.")

    # Update the MongoDB collection with valid data, storing 'recommended_courses' as an array
    recommendations_collection.update_one(
        {'userId': user_id},
        {'$set': {'userId': user_id, 'recommended_courses': recommended_courses_details}},
        upsert=True
    )

# Save recommendations to MongoDB
save_recommendations_to_mongo(user_id=1, recommendations=recommended_courses)

# Close the MongoDB connection
client.close()
