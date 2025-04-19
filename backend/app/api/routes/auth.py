from fastapi import APIRouter, HTTPException, Depends
from app.schemas.user import UserCreate, UserOut
from app.services.auth_service import AuthService
from app.core.deps import get_current_user

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register_user(user: UserCreate):
    created_user = await AuthService.register_user(user)
    if not created_user:
        raise HTTPException(status_code=400, detail="User registration failed")
    return created_user

@router.post("/login", response_model=str)
async def login_user(user: UserCreate):
    token = await AuthService.login_user(user)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return token

@router.get("/me", response_model=UserOut)
async def read_users_me(current_user: UserOut = Depends(get_current_user)):
    return current_user