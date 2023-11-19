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
import gc
import re
from sklearn.metrics import silhouette_score
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors=CORS(app)
app.config['CORS_HEADERS']='Content-Type'

class ChatInput:
    def __init__(self, user_id: int, chat_id: int, topic: str, query: str):
        self.user_id = user_id
        self.chat_id = chat_id
        self.topic = topic
        self.query = query

@app.route("/retirement-calculator", methods=['GET'])
@cross_origin()
def retirement_calculator():
    csv_file_path = "./retirement_plans.csv"
    openai_api_key = os.environ.get('OPENAI_API_KEY')
    # os.environ["OPENAI_API_KEY"] = openai_api_key
    # llm = OpenAI(openai_api_key=openai_api_key)
    loader = CSVLoader(file_path=csv_file_path, encoding="utf-8")
    data = loader.load()
    embeddings = OpenAIEmbeddings()
    vectors = FAISS.from_documents(data, embeddings)

    salary = float(request.args.get('salary'))
    current_age = int(request.args.get('current_age'))
    goal_retirement_age = int(request.args.get('goalRetirementAge'))
    work_experience = int(request.args.get('workExperience'))
    safety_in_retirement = request.args.get('safetyInRetirement')
    type_of_retirement = request.args.get('typeOfRetirement')
    inflation_rate = float(request.args.get('inflation_rate'))
    current_net_worth = float(request.args.get('currentNetWorth'))
    no_of_dependents = int(request.args.get('noOfDependents'))

    profile = {
      'salary': salary,
      'current_age': current_age,
      'goalRetirementAge': goal_retirement_age,
      'workExperience': work_experience,
      'safetyInRetirement': safety_in_retirement,
      'typeOfRetirement': type_of_retirement,
      'inflation_rate': inflation_rate,
      'currentNetWorth': current_net_worth,
      'noOfDependents': no_of_dependents
    }
  
    load_dotenv()
    question = f"My current salary is {profile['salary']} per month. I have work experience of {profile['workExperience']} years. I want to retire by {profile['goalRetirementAge']}. I want {profile['safetyInRetirement']} type of safety in my retirement plan, of the type '{profile['typeOfRetirement']}'. The current inflation rate is {profile['inflation_rate']}. My current Net Worth is {profile['currentNetWorth']}. I have {profile['noOfDependents']} people that are dependent on me in my family. Suggest me a plan that fits for my current age, keeps my current salary and net worth in mind, and gives me the best possible returns at the end of the tenure. Limit the output to 300 characters."

    chain = ConversationalRetrievalChain.from_llm(
        llm=ChatOpenAI(temperature=0.8, model_name='gpt-3.5-turbo', openai_api_key=openai_api_key),
        retriever=vectors.as_retriever()
        )
    plan = chain({"question": question, "chat_history": ""})

    # Calculate Retirement Returns
    time = profile['goalRetirementAge'] - profile['current_age']
    rate = 0
    if profile['safetyInRetirement'] == 'Cautious':
        rate = 0.07
    elif profile['safetyInRetirement'] == 'Daring':
        rate = 0.12
    else: 
        rate = 0.09
    match = re.search(re.compile(r'₹([0-9,]+)'), plan['answer'])
    if match:
        matched_string = match.group(1)
        investment = int(matched_string.replace(',', ''))
    else:
        investment = 30000
    future_value = 0
    for year in range(1, time + 1):
        future_value += investment * (1 + rate)**(time - year)
    future_value = int(future_value)

    return jsonify({"plan": plan['answer'], "investment": investment, "time": time, "returns": future_value})

@app.route('/chat', methods=['POST'])
@cross_origin()
def conversational_chat():
    csv_file_path = "./retirement_plans.csv"
    openai_api_key = os.environ.get('OPENAI_API_KEY')
    # os.environ["OPENAI_API_KEY"] = openai_api_key
    llm = OpenAI(openai_api_key=openai_api_key)
    loader = CSVLoader(file_path=csv_file_path, encoding="utf-8")
    data = loader.load()
    embeddings = OpenAIEmbeddings()
    vectors = FAISS.from_documents(data, embeddings)

    data = request.get_json()
    load_dotenv()

    supabase_url = os.environ.get('SUPABASE_URL')
    supabase_key = os.environ.get('SUPABASE_KEY')

    supabase_client = supabase.create_client(supabase_url, supabase_key)

    template = """
    question: {question}

    Extract the topic of the conversation

    Topic:
    """

    chain = ConversationalRetrievalChain.from_llm(
        llm=ChatOpenAI(temperature=0.0, model_name='gpt-3.5-turbo', openai_api_key=openai_api_key),
        retriever=vectors.as_retriever(), get_chat_history=lambda h : h
        )

    conversation_history = []
    current_timestamp = datetime.now().isoformat()

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
        data['topic']=res

    chat_input = ChatInput(
        user_id=data['user_id'],
        chat_id=data['chat_id'],
        topic=data['topic'],
        query=data['query']
    )

    history = supabase_client.table('messages').select('messages').filter('chat_id', 'eq', chat_input.chat_id).execute()
    history=history.data
    print(history)
    print("-"*50)
    # history = [ast.literal_eval(history[i]['messages']) for i in range(len(history))] if history else []
    history=ast.literal_eval(history[-1]['messages']) if history else []
    print(history)
    print("-"*50)
    print([list(hist.values()) for hist in history] if history else [])
    print("-"*50)
    result = chain({"question": chat_input.query, "chat_history": [list(hist.values()) for hist in history] if history else []})
    conversation_history.append((chat_input.query, result["answer"]))
    updated_history = history+[{"query": chat_input.query, "response": result["answer"], "timestamp": datetime.now().isoformat()}]
    supabase_client.table('messages').upsert([{
            'chat_id': chat_input.chat_id,
            'messages': updated_history,
        }]
    ).execute()
    print("CHATTED -"*50)
    return jsonify({"user_id": chat_input.user_id, "chat_id": chat_input.chat_id, "response": result["answer"]})

def perform_clustering(user_id):
    load_dotenv()

    supabase_url = os.environ.get('SUPABASE_URL')
    supabase_key = os.environ.get('SUPABASE_KEY')

    supabase_client = supabase.create_client(supabase_url, supabase_key)
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
        cluster_content = df[df['cluster_label'] == cluster_label]['user_id'].to_list()
        clusters[str(cluster_label)] = cluster_content
    print(clusters)
    for num, cluster in clusters.items():
        if user_id in cluster:
            return cluster

    return None

@app.route("/update-and-get-clusters", methods=['GET'])
@cross_origin()
def update_and_get_clusters():
    user_id = request.args.get('user_id')
    clusters = perform_clustering(user_id)

    return jsonify({"forum": clusters})
  
@app.route("/get-info", methods=['GET'])
@cross_origin()
def get_info():
    user_id = request.args.get('user_id')
    load_dotenv()

    supabase_url = os.environ.get('SUPABASE_URL')
    supabase_key = os.environ.get('SUPABASE_KEY')

    supabase_client = supabase.create_client(supabase_url, supabase_key)
    response = supabase_client.table('user').select('*').filter('id', 'eq', user_id).execute()
    profiles = response.data

    df = pd.DataFrame(profiles)

    return jsonify({"info": df.to_dict(orient='records')})
  
@app.route("/")
@cross_origin()
def hello_world():
    return "<p>Welcome to our API!</p>"

# def keep_alive():
#   t=Thread(target=run)
#   t.start()
#   print("Alive")
#   return True
  
if __name__ == '__main__':
  app.run(host='0.0.0.0',port=8080)
#   keep_alive()