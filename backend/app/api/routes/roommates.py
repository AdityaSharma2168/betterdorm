from fastapi import APIRouter, HTTPException
from typing import List
from app.models.roommate_request import RoommateRequest
from app.schemas.roommate import RoommateRequestCreate, RoommateRequestResponse
from app.services.roommate_service import RoommateService

router = APIRouter()
roommate_service = RoommateService()

@router.post("/", response_model=RoommateRequestResponse)
async def create_roommate_request(request: RoommateRequestCreate):
    try:
        return await roommate_service.create_request(request)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[RoommateRequestResponse])
async def get_roommate_requests():
    try:
        return await roommate_service.get_all_requests()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{request_id}", response_model=RoommateRequestResponse)
async def get_roommate_request(request_id: str):
    try:
        return await roommate_service.get_request(request_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{request_id}", response_model=dict)
async def delete_roommate_request(request_id: str):
    try:
        await roommate_service.delete_request(request_id)
        return {"detail": "Request deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))