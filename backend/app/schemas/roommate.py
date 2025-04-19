from pydantic import BaseModel
from typing import Optional

class RoommateRequest(BaseModel):
    user_id: str
    preferred_gender: Optional[str] = None
    max_rent: Optional[float] = None
    move_in_date: Optional[str] = None
    description: Optional[str] = None

class RoommateResponse(BaseModel):
    id: str
    user_id: str
    preferred_gender: Optional[str]
    max_rent: Optional[float]
    move_in_date: Optional[str]
    description: Optional[str]