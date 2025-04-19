from passlib.context import CryptContext
from pymongo import MongoClient
from bson import ObjectId
from app.schemas.user import UserCreate, UserOut
from app.core.security import create_access_token
from fastapi import HTTPException, Depends
from app.api.deps import get_current_user
from app.models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self, db: MongoClient):
        self.db = db

    def hash_password(self, password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    def register_user(self, user: UserCreate) -> UserOut:
        user_dict = user.dict()
        user_dict['password'] = self.hash_password(user.password)
        new_user = User(**user_dict)
        self.db.users.insert_one(new_user.dict())
        return UserOut(**new_user.dict())

    def authenticate_user(self, username: str, password: str) -> str:
        user = self.db.users.find_one({"username": username})
        if not user or not self.verify_password(password, user['password']):
            raise HTTPException(status_code=400, detail="Invalid username or password")
        return create_access_token(data={"sub": user['username']})

    def get_user(self, user_id: str) -> UserOut:
        user = self.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return UserOut(**user)