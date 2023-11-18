from flask import Flask, request, jsonify
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain, LLMChain
from langchain.vectorstores import FAISS
from langchain.llms import OpenAI
from langchain import PromptTemplate
import os, supabase, ast
from datetime import datetime
import pandas as pd
from sklearn.cluster import AffinityPropagation
from sklearn.preprocessing import StandardScaler, LabelEncoder
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_KEY')

supabase_client = supabase.create_client(supabase_url, supabase_key)

csv_file_path = "./retirement_plans.csv"
openai_api_key = os.environ.get('OPENAI_API_KEY')
# os.environ["OPENAI_API_KEY"] = openai_api_key
llm = OpenAI(openai_api_key=openai_api_key)
loader = CSVLoader(file_path=csv_file_path, encoding="utf-8")
data = loader.load()
embeddings = OpenAIEmbeddings()
vectors = FAISS.from_documents(data, embeddings)

template = """
question: {question}

Extract the topic of the conversation

Topic:
"""

chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(temperature=0.0, model_name='gpt-3.5-turbo', openai_api_key=openai_api_key),
    retriever=vectors.as_retriever()
    )

conversation_history = []
current_timestamp = datetime.now().isoformat()

app.run(debug=True)

class ChatInput:
    def __init__(self, user_id: int, chat_id: int, topic: str, query: str):
        self.user_id = user_id
        self.chat_id = chat_id
        self.topic = topic
        self.query = query

@app.route('/chat', methods=['GET'])
def conversational_chat():
    data = request.get_json()

    if 'chat_id' not in data:
        user_chats = supabase_client.table('chats').select('id').filter('user_id', 'eq', data['user_id']).execute()
        max_chat_id = max([chat['chat_id'] for chat in user_chats]) + 1 if user_chats.count else 1
        data['chat_id'] = max_chat_id
        
        question = data['query']
        prompt = PromptTemplate.from_template(template)
        formatted_prompt = prompt.format(question=question)
        chain1 = LLMChain(llm=llm, prompt=prompt)
        res = chain1.run(formatted_prompt)
        
        supabase_client.table('chats').upsert([{
            'id': data['chat_id'],
            'user_id': data['user_id'],
            'topic': res,
        }]).execute()

    chat_input = ChatInput(
        user_id=data['user_id'],
        chat_id=data['chat_id'],
        topic=data['topic'],
        query=data['query']
    )
    
    history = supabase_client.table('messages').select('messages').filter('chat_id', 'eq', chat_input.chat_id).execute()
    history=history.data
    history = ast.literal_eval(history[0]['messages']) if history else []
    result = chain({"question": chat_input.query, "chat_history": conversation_history})
    conversation_history.append((chat_input.query, result["answer"]))
    updated_history = history+[{"query": chat_input.query, "response": result["answer"], "timestamp": datetime.now().isoformat()}]
    supabase_client.table('messages').upsert([{
            'chat_id': chat_input.chat_id,
            'messages': updated_history,
        }]
    ).execute()

    return jsonify({"user_id": chat_input.user_id, "chat_id": chat_input.chat_id, "response": result["answer"]})

def perform_clustering(user_id):
    response = supabase_client.table('profile').select('*').execute()
    profiles = response.data

    df = pd.DataFrame(profiles)

    selected_columns = ['salary', 'work_experience', 'age', 'goal_retirement_age', 'type_of_retirement', 'safety_in_retirement']

    label_encoder = LabelEncoder()
    df['type_of_retirement'] = label_encoder.fit_transform(df['type_of_retirement'])
    df['safety_in_retirement'] = label_encoder.fit_transform(df['safety_in_retirement'])

    df[selected_columns] = df[selected_columns].fillna(df[selected_columns].mean())

    scaler = StandardScaler()
    df[selected_columns] = scaler.fit_transform(df[selected_columns])

    data_for_clustering = df[selected_columns].values

    affinity_propagation = AffinityPropagation()
    labels = affinity_propagation.fit_predict(data_for_clustering)

    df['cluster_label'] = labels
    for index, row in df.iterrows():
        supabase_client.table('profile').update({'cluster_label': int(row['cluster_label'])}).eq('id', int(row['id'])).execute()

    clusters = {}
    for cluster_label in df['cluster_label'].unique():
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
def hello_world():
    return "<p>Welcome to our API!</p>"