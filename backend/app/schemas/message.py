from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MessageBase(BaseModel):
    sender_id: str
    recipient_id: str
    content: str
    timestamp: datetime

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: str

    class Config:
        orm_mode = True