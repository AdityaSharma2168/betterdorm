from fastapi import APIRouter

router = APIRouter()

from . import auth, users, dorms, roommates, chatbot

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(dorms.router, prefix="/dorms", tags=["dorms"])
router.include_router(roommates.router, prefix="/roommates", tags=["roommates"])
router.include_router(chatbot.router, prefix="/chatbot", tags=["chatbot"])