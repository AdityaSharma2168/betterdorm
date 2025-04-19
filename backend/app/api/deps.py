from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.models.user import User
from app.core.security import verify_token
from app.core.database import get_current_user_from_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    user = await verify_token(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return user

async def get_user_from_db(user_id: str) -> User:
    user = await get_current_user_from_db(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user