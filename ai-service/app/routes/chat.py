from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.services.ai_service import get_ai_response
from app.auth import get_current_user, get_db
from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message


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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # ==========================================
    # 1. CREATE NEW CONVERSATION
    # ==========================================

    conversation = Conversation(
        title=request.message[:50],
        user_id=current_user.id
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)


    # ==========================================
    # 2. PREPARE MESSAGES FOR AI
    # ==========================================

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


    # ==========================================
    # 3. SAVE USER MESSAGE
    # ==========================================

    user_message = Message(
        role="user",
        content=request.message,
        conversation_id=conversation.id
    )

    db.add(user_message)
    db.commit()


    # ==========================================
    # 4. GET AI RESPONSE
    # ==========================================

    answer = get_ai_response(messages)


    # ==========================================
    # 5. SAVE AI MESSAGE
    # ==========================================

    assistant_message = Message(
        role="assistant",
        content=answer,
        conversation_id=conversation.id
    )

    db.add(assistant_message)
    db.commit()


    # ==========================================
    # 6. RETURN RESPONSE
    # ==========================================

    return {
        "answer": answer,

        "conversation_id": conversation.id,

        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email
        }
    }
