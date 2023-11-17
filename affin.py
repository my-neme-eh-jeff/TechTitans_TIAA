from fastapi import FastAPI
from flask import Flask, jsonify, request
import supabase
import pandas as pd
from sklearn.cluster import AffinityPropagation
from sklearn.preprocessing import StandardScaler, LabelEncoder

# app = FastAPI()
app = Flask(__name__)

# Replace 'your-url' and 'your-key' with your actual Supabase URL and API key
supabase_url = 'https://vmrltnjfjfhtmogcwcho.supabase.co'
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtcmx0bmpmamZodG1vZ2N3Y2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5OTgxMzgsImV4cCI6MjAwODU3NDEzOH0.yo8vltcmWBBhPgj1EsC3jPxqavO4Ime4l-rWuTAL1H0'

# Connect to Supabase
supabase_client = supabase.create_client(supabase_url, supabase_key)

def perform_clustering(user_id):
    # Fetch data from the 'profile' table
    response = supabase_client.table('profile').select('*').execute()
    profiles = response.data

    # Convert data to a Pandas DataFrame for easier preprocessing
    df = pd.DataFrame(profiles)

    # Select relevant columns for clustering
    selected_columns = ['salary', 'work_experience', 'age', 'goal_retirement_age', 'type_of_retirement', 'safety_in_retirement']

    # Handle label encoding for the 'type_of_retirement' column
    label_encoder = LabelEncoder()
    df['type_of_retirement'] = label_encoder.fit_transform(df['type_of_retirement'])
    df['safety_in_retirement'] = label_encoder.fit_transform(df['safety_in_retirement'])

    # Handle missing values (replace NaN with the mean or other suitable strategies)
    df[selected_columns] = df[selected_columns].fillna(df[selected_columns].mean())

    # Standardize the numerical features
    scaler = StandardScaler()
    df[selected_columns] = scaler.fit_transform(df[selected_columns])

    # Extract the preprocessed data for clustering
    data_for_clustering = df[selected_columns].values

    # Apply Affinity Propagation clustering
    affinity_propagation = AffinityPropagation()
    labels = affinity_propagation.fit_predict(data_for_clustering)

    # Add the cluster labels to the 'profile' table in Supabase
    df['cluster_label'] = labels
    for index, row in df.iterrows():
        supabase_client.table('profile').update({'cluster_label': int(row['cluster_label'])}).eq('id', int(row['id'])).execute()

    # Create a dictionary to store clusters and their content
    clusters = {}
    for cluster_label in df['cluster_label'].unique():
        # Include only the 'user_id' and other specific columns in the cluster_content
        cluster_content = df[df['cluster_label'] == cluster_label][['user_id']].astype(int).to_dict(orient='records')
        clusters[str(cluster_label)] = cluster_content

    for num, cluster in clusters.items():
        if user_id in cluster:
            return cluster[num]
    
    return None

@app.route("/update-and-get-clusters", methods=['GET'])
def update_and_get_clusters():
    user_id = request.args.get('user_id')
    clusters = perform_clustering(user_id)

    return jsonify({"forum": clusters})

@app.route("/")
def main():
    return jsonify({"message": "Welcome to the Mann API!"})

if __name__ == "__main__":
    app.run(debug=True)