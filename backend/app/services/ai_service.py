from fastapi import HTTPException
from pydantic import BaseModel
from typing import List
import openai

class ChatbotRequest(BaseModel):
    user_message: str

class ChatbotResponse(BaseModel):
    response: str

class AIService:
    def __init__(self, openai_api_key: str):
        openai.api_key = openai_api_key

    def get_response(self, user_message: str) -> str:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": user_message}]
            )
            return response.choices[0].message['content']
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    def filter_dorm_offerings(self, dorms: List[dict], user_preferences: dict) -> List[dict]:
        # Implement NLP filtering logic based on user preferences
        filtered_dorms = []
        for dorm in dorms:
            # Example filtering logic (to be replaced with actual NLP logic)
            if user_preferences.get("max_price", float('inf')) >= dorm.get("price", float('inf')):
                filtered_dorms.append(dorm)
        return filtered_dorms