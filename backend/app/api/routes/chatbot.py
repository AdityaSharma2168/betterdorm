from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import AIService

router = APIRouter()
ai_service = AIService()

class UserQuery(BaseModel):
    query: str

@router.post("/chat")
async def chat_with_ai(user_query: UserQuery):
    try:
        response = await ai_service.process_query(user_query.query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))