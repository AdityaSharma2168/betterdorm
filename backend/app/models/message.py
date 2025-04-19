from pydantic import BaseModel
from bson import ObjectId

class Message(BaseModel):
    id: str
    user_id: str
    content: str
    timestamp: str

    class Config:
        json_encoders = {
            ObjectId: str
        }