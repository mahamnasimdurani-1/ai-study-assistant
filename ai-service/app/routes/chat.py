from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.services.ai_service import get_ai_response
from app.auth import get_current_user
from app.models.user import User


router = APIRouter()


# ==========================================
# CHAT MESSAGE
# ==========================================

class ChatMessage(BaseModel):
    role: str
    content: str


# ==========================================
# CHAT REQUEST
# ==========================================

class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


# ==========================================
# CHAT API
# ==========================================

@router.post("/chat")
def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):

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

    # Get AI response
    answer = get_ai_response(messages)

    return {
        "answer": answer,
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email
        }
    }

