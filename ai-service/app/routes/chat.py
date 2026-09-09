from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import get_ai_response


router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


@router.post("/chat")
def chat(request: ChatRequest):

    messages = []

    # Previous conversation
    for message in request.history:
        messages.append({
            "role": message.role,
            "content": message.content
        })

    # Current user message
    messages.append({
        "role": "user",
        "content": request.message
    })

    answer = get_ai_response(messages)

    return {
        "answer": answer
    }