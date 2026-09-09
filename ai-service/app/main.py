# import os

# from dotenv import load_dotenv
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from openai import OpenAI

# load_dotenv()

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# client = OpenAI(
#     api_key=os.getenv("OPENAI_API_KEY")
# )

# conversation_history = []

# class chatMessage(BaseModel):
#     role: str
#     content: str
# class chatRequest(BaseModel):
#     message: str
#     history: list[chatMessage] = []


# @app.get("/")
# def home():
#     return {
#         "message": "AI Study Assistant API is running"
#     }


# # @app.post("/chat")
# # def chat(request: chatRequest):
# #     messages = []

# #     for message in request.history:
# #         messages.append({
# #             "role": message.role,
# #             "content": message.content
# #         })

# #     # Current user message
# #     messages.append({
# #         "role": "user",
# #         "content": request.message
# #     })

# #     response = client.responses.create(
# #         model="gpt-5.6-luna",
# #         instructions="""
# #         You are an AI Study Assistant.

# #         Your job is to help students learn programming,
# #         Python, JavaScript, MERN, Machine Learning,
# #         Data Science, and AI.

# #         Follow these rules:
# #         1. Explain difficult concepts in simple language.
# #         2. Give examples when useful.
# #         3. Explain step by step.
# #         4. If the student is confused, explain the concept
# #            again in an even simpler way.
# #         5. Do not unnecessarily make answers complicated.
# #         6. Encourage understanding instead of just giving
# #            the final answer.
# #         7. Use previous conversation context when answering.
# #         """,
# #         input=messages
# #     )

# #     return {
# #         "answer": response.output_text
# #     }



# @app.post("/chat")
# def chat(request: chatRequest):

#     conversation_history.append({
#         "role": "user",
#         "content": request.message
#     })

#     response = client.responses.create(
#         model="gpt-5.6-luna",
#         instructions="""
#         You are an AI Study Assistant.

#         Your job is to help students learn programming,
#         Python, JavaScript, MERN, Machine Learning,
#         Data Science, and AI.

#         Follow these rules:
#         1. Explain difficult concepts in simple language.
#         2. Give examples when useful.
#         3. Explain step by step.
#         4. If the student is confused, explain again simply.
#         5. Do not unnecessarily make answers complicated.
#         6. Encourage understanding instead of just giving
#            the final answer.
#         7. Use previous conversation context when answering.
#         """,
#         input=conversation_history
#     )

#     conversation_history.append({
#         "role": "assistant",
#         "content": response.output_text
#     })

#     return {
#         "answer": response.output_text
#     }




import os

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router as chat_router


# load_dotenv()


app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes
app.include_router(chat_router)


@app.get("/")
def home():
    return {
        "message": "AI Study Assistant API is running"
    }
