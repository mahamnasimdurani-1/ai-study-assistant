import os

from dotenv import load_dotenv
from fastapi import FastAPI
from openai import OpenAI

load_dotenv()

app = FastAPI()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


@app.get("/")
def home():
    return {
        "message": "AI Study Assistant API is running"
    }


@app.get("/chat")
def chat():
    response = client.responses.create(
        model="gpt-5.6-luna",
        input="Explain Python in one simple sentence."
    )

    return {
        "answer": response.output_text
    }