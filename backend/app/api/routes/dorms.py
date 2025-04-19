from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.schemas.dorm import DormCreate, Dorm, DormUpdate
from app.services.dorm_service import DormService
from app.api.deps import get_current_user

router = APIRouter()
dorm_service = DormService()

@router.post("/", response_model=Dorm)
async def create_dorm(dorm: DormCreate, current_user: str = Depends(get_current_user)):
    return await dorm_service.create_dorm(dorm, current_user)

@router.get("/", response_model=List[Dorm])
async def get_dorms(skip: int = 0, limit: int = 10):
    return await dorm_service.get_dorms(skip=skip, limit=limit)

@router.get("/{dorm_id}", response_model=Dorm)
async def get_dorm(dorm_id: str):
    dorm = await dorm_service.get_dorm(dorm_id)
    if not dorm:
        raise HTTPException(status_code=404, detail="Dorm not found")
    return dorm

@router.put("/{dorm_id}", response_model=Dorm)
async def update_dorm(dorm_id: str, dorm: DormUpdate, current_user: str = Depends(get_current_user)):
    updated_dorm = await dorm_service.update_dorm(dorm_id, dorm, current_user)
    if not updated_dorm:
        raise HTTPException(status_code=404, detail="Dorm not found")
    return updated_dorm

@router.delete("/{dorm_id}", response_model=dict)
async def delete_dorm(dorm_id: str, current_user: str = Depends(get_current_user)):
    result = await dorm_service.delete_dorm(dorm_id, current_user)
    if not result:
        raise HTTPException(status_code=404, detail="Dorm not found")
    return {"detail": "Dorm deleted successfully"}