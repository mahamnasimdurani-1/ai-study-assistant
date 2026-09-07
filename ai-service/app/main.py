import os

from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

app = FastAPI()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

class chatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "message": "AI Study Assistant API is running"
    }


@app.post("/chat")
def chat(response: chatRequest):
    response = client.responses.create(
        model="gpt-5.6-luna",
        instructions="""
    You are an AI Study Assistant.

    Your job is to help students learn programming,
    Python, JavaScript, MERN, Machine Learning,
    Data Science, and AI.

    Follow these rules:
    1. Explain difficult concepts in simple language.
    2. Give examples when useful.
    3. Explain step by step.
    4. If the student is confused, explain the concept
       again in an even simpler way.
    5. Do not unnecessarily make answers complicated.
    6. Encourage understanding instead of just giving
       the final answer.
    """,
        input=response.message
    )

    return {
        "answer": response.output_text
    }