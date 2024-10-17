import pandas as pd
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['recom']

# Retrieve data from MongoDB collections
domain_inputs_collection = db['domaininputs']
domains_collection = db['domains']

# Convert to Pandas DataFrame
domain_inputs_df = pd.DataFrame(list(domain_inputs_collection.find()))
domains_df = pd.DataFrame(list(domains_collection.find()))

# Drop '_id' column if it exists
if '_id' in domain_inputs_df.columns:
    domain_inputs_df = domain_inputs_df.drop(columns=['_id'])
if '_id' in domains_df.columns:
    domains_df = domains_df.drop(columns=['_id'])

# Ensure necessary columns exist
domains_df['description'] = domains_df.get('description', '')
domains_df['keywords'] = domains_df.get('keywords', '')

def recommend_domains(user_id):
    # Retrieve user input for domain
    user_input = domain_inputs_df[domain_inputs_df['userId'] == user_id]
    
    if user_input.empty:
        return []
    
    # Create a profile for the user
    user_profile = ' '.join(user_input[['interests', 'pastExperience', 'skills']].values[0])
    
    # Vectorize the user profile and domain data
    vectorizer = TfidfVectorizer()
    domains_df['combined_info'] = domains_df['domain'] + ' ' + domains_df['description'] + ' ' + domains_df['keywords']
    corpus = domains_df['combined_info'].tolist()
    
    vectorizer.fit(corpus)
    user_vector = vectorizer.transform([user_profile])
    domain_vectors = vectorizer.transform(corpus)

    # Calculate similarity
    similarities = cosine_similarity(user_vector, domain_vectors).flatten()
    
    # Get recommendations based on similarity
    recommended_indices = similarities.argsort()[::-1]
    top_recommendations = domains_df.iloc[recommended_indices]
    
    threshold = 0.2
    top_recommendations = top_recommendations[similarities > threshold]
    
    # Return top 10 recommendations
    recommendations = top_recommendations['domain'].tolist()[:10]
    
    # Store the recommendations in 'domainrecom' collection
    db['domainrecommendations'].insert_one({
        'userId': user_id,
        'recommended_domains': recommendations
    })
    
    return recommendations

# Example run (for testing purposes)
user_id = 1  # Replace with dynamic input
recommendations = recommend_domains(user_id)
print(f"Recommended domains for User ID {user_id}: {recommendations}")

client.close()
