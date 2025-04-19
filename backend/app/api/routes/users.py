from fastapi import APIRouter, Depends
from app.schemas.user import User, UserCreate
from app.services.user_service import UserService
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    return await UserService.create_user(user)

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/users/{user_id}", response_model=User)
async def read_user(user_id: str):
    return await UserService.get_user(user_id)