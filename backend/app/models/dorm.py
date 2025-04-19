from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional, List

class Dorm(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    title: str
    description: str
    location: str
    price: float
    amenities: List[str]
    available_from: str
    created_at: str
    updated_at: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }