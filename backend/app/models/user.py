from pydantic import BaseModel, EmailStr
from bson import ObjectId
from typing import Optional, List

class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: EmailStr
    password: str
    dorms: List[str] = []
    roommates: List[str] = []

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True

    def to_mongo(self):
        return {
            "_id": ObjectId(self.id) if self.id else None,
            "username": self.username,
            "email": self.email,
            "password": self.password,
            "dorms": self.dorms,
            "roommates": self.roommates,
        }

    @classmethod
    def from_mongo(cls, data):
        return cls(
            id=str(data["_id"]),
            username=data["username"],
            email=data["email"],
            password=data["password"],
            dorms=data.get("dorms", []),
            roommates=data.get("roommates", []),
        )