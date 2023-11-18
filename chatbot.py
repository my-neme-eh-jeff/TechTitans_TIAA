from flask import Flask, request, jsonify
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.vectorstores import FAISS
import os
import supabase
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from datetime import datetime

app = Flask(__name__)

csv_file_path = "./retirement_plans.csv"
openai_api_key = "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"
os.environ["OPENAI_API_KEY"] = openai_api_key
llm = OpenAI(openai_api_key=openai_api_key)

supabase_url = 'https://vmrltnjfjfhtmogcwcho.supabase.co'
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtcmx0bmpmamZodG1vZ2N3Y2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5OTgxMzgsImV4cCI6MjAwODU3NDEzOH0.yo8vltcmWBBhPgj1EsC3jPxqavO4Ime4l-rWuTAL1H0'
supabase_client = supabase.create_client(supabase_url, supabase_key)

# Load data from CSV
loader = CSVLoader(file_path=csv_file_path, encoding="utf-8")
data = loader.load()

# Create embeddings and vectors
embeddings = OpenAIEmbeddings()
vectors = FAISS.from_documents(data, embeddings)

from langchain import PromptTemplate

template = """
question: {question}

Extract the topic of the conversation

Topic:
"""

# Create conversation chain
chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(temperature=0.0, model_name='gpt-3.5-turbo', openai_api_key=openai_api_key),
    retriever=vectors.as_retriever()
)

conversation_history = []
current_timestamp = datetime.now().isoformat()

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
        # If chat_id is missing, search for the max chat_id for a particular user_id
        user_chats = supabase_client.table('chats').select('chat_id').filter('user_id', 'eq', data['user_id']).execute()
        max_chat_id = max([chat['chat_id'] for chat in user_chats]) + 1 if user_chats else 1
        data['chat_id'] = max_chat_id
        
        # Topic modelling on the first query
        question = data['query']
        prompt = PromptTemplate.from_template(template)
        formatted_prompt = prompt.format(question=question)
        chain1 = LLMChain(llm=llm, prompt=prompt)
        res = chain1.run(formatted_prompt)
        
        supabase_client.table('chats').upsert([{
            'chat_id': data['chat_id'],
            'user_id': data['user_id'],
            'topic': res,
            'created_at': current_timestamp,  # Set to the current timestamp or adjust accordingly
            'updated_at': current_timestamp  # Set to the current timestamp or adjust accordingly
        }]).execute()

    chat_input = ChatInput(
        user_id=data['user_id'],
        chat_id=data['chat_id'],
        topic=data['topic'],
        query=data['query']
    )
    
    history = supabase_client.table('messages').select('messages').filter('chat_id', 'eq', chat_input.chat_id).execute()
    history = history[0]['messages'] if history else []
    print(dir(history))
    result = chain({"question": chat_input.query, "chat_history": conversation_history})
    conversation_history.append((chat_input.query, result["answer"]))
    updated_history = history + [{"query": chat_input.query, "response": result["answer"], "timestamp": datetime.now().isoformat()}]
    supabase_client.table('messages').upsert([{
            'chat_id': chat_input.chat_id,
            'user_id': chat_input.user_id,
            'messages': updated_history,
        }], condition=[
        ('chat_id', 'eq', chat_input.chat_id),
        ('user_id', 'eq', chat_input.user_id)
    ]).execute()

    return jsonify({"user_id": chat_input.user_id, "chat_id": chat_input.chat_id, "response": result["answer"]})

if __name__ == '__main__':
    app.run(debug=True)