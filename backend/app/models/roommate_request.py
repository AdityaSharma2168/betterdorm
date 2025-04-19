from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RoommateRequest(BaseModel):
    user_id: str
    preferred_gender: Optional[str] = None
    max_rent: Optional[float] = None
    move_in_date: Optional[datetime] = None
    preferences: Optional[str] = None
    created_at: datetime = datetime.now()