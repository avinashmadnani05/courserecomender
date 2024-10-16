import pandas as pd
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['recom']

# Retrieve data from the MongoDB collections
domain_inputs_collection = db['domaininputs']
domains_collection = db['domains']

# Convert the data to Pandas DataFrames
domain_inputs_df = pd.DataFrame(list(domain_inputs_collection.find()))
domains_df = pd.DataFrame(list(domains_collection.find()))

# Drop the '_id' field if it exists
if '_id' in domain_inputs_df.columns:
    domain_inputs_df = domain_inputs_df.drop(columns=['_id'])
if '_id' in domains_df.columns:
    domains_df = domains_df.drop(columns=['_id'])

# Check if description and keywords exist, if not, create empty columns
if 'description' not in domains_df.columns:
    domains_df['description'] = ''  # Create an empty description if it doesn't exist

if 'keywords' not in domains_df.columns:
    domains_df['keywords'] = ''  # Create an empty keywords field if it doesn't exist

# Function to recommend domains based on user input
def recommend_domains(user_id):
    # Get the user input for domain, interests, pastExperience, and skills
    user_input = domain_inputs_df[domain_inputs_df['userId'] == user_id]
    
    if user_input.empty:
        print(f"No data found for user ID: {user_id}")
        return []
    
    user_interests = user_input['interests'].values[0].split()
    user_experience = user_input['pastExperience'].values[0].split()
    user_skills = user_input['skills'].values[0].split()

    # Combine interests, pastExperience, and skills to create a profile for the user
    user_profile = ' '.join(user_interests + user_experience + user_skills)

    # Create a TF-IDF vectorizer for matching user profile with domains
    vectorizer = TfidfVectorizer()
    
    # Create a corpus of domain descriptions and keywords from the domains collection
    domains_df['combined_info'] = domains_df['domain'] + ' ' + domains_df['description'] + ' ' + domains_df['keywords']
    corpus = domains_df['combined_info'].tolist()

    # Fit the TF-IDF model and transform both the user profile and the domain corpus
    vectorizer.fit(corpus)
    user_vector = vectorizer.transform([user_profile])
    domain_vectors = vectorizer.transform(corpus)

    # Calculate similarity between the user profile and each domain
    similarities = cosine_similarity(user_vector, domain_vectors).flatten()

    # Get the top matching domains based on similarity scores
    recommended_indices = similarities.argsort()[::-1]  # Sort by highest similarity first
    recommended_domains = domains_df.iloc[recommended_indices]

    # Filter recommendations with a threshold (e.g., similarity score > 0.2)
    threshold = 0.2
    top_recommendations = recommended_domains[similarities > threshold]
    
    if top_recommendations.empty:
        print(f"No strong matches found for the user's profile.")
        return []
    
    # Return the top recommendations (courses)
    recommendations = top_recommendations['recommendations'].tolist()
    return recommendations[:10]  # Return top 10 recommendations

# Test the domain recommender for a specific user
user_id = 1  # Change this ID to test other users
recommended_courses = recommend_domains(user_id)

# Print the recommended domains
print("Recommended Courses for User ID {}: {}".format(user_id, recommended_courses))

# Close the MongoDB connection
client.close()
