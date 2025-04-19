from pydantic import BaseModel
from typing import Optional, List

class DormBase(BaseModel):
    title: str
    description: str
    location: str
    price: float
    amenities: List[str]
    available_from: str

class DormCreate(DormBase):
    pass

class Dorm(DormBase):
    id: str

    class Config:
        orm_mode = True

class DormUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    price: Optional[float] = None
    amenities: Optional[List[str]] = None
    available_from: Optional[str] = None