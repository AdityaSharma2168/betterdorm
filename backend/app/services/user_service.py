from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.database import get_db
from bson import ObjectId
from typing import List, Optional
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: UserCreate) -> User:
        db_user = User(**user.dict())
        self.db.users.insert_one(db_user.dict())
        return db_user

    def get_user(self, user_id: str) -> Optional[User]:
        user = self.db.users.find_one({"_id": ObjectId(user_id)})
        if user:
            return User(**user)
        raise HTTPException(status_code=404, detail="User not found")

    def update_user(self, user_id: str, user_update: UserUpdate) -> User:
        update_data = user_update.dict(exclude_unset=True)
        result = self.db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        return self.get_user(user_id)

    def delete_user(self, user_id: str) -> None:
        result = self.db.users.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="User not found")

    def get_all_users(self) -> List[User]:
        users = self.db.users.find()
        return [User(**user) for user in users]