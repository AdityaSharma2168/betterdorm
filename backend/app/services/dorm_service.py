from typing import List, Optional
from fastapi import HTTPException
from app.models.dorm import Dorm
from app.schemas.dorm import DormCreate, DormUpdate
from app.core.database import db

class DormService:
    @staticmethod
    async def create_dorm(dorm: DormCreate) -> Dorm:
        dorm_data = dorm.dict()
        new_dorm = Dorm(**dorm_data)
        await db.dorms.insert_one(new_dorm.dict())
        return new_dorm

    @staticmethod
    async def get_dorms(skip: int = 0, limit: int = 10) -> List[Dorm]:
        dorms = await db.dorms.find().skip(skip).limit(limit).to_list(length=limit)
        return dorms

    @staticmethod
    async def get_dorm_by_id(dorm_id: str) -> Optional[Dorm]:
        dorm = await db.dorms.find_one({"_id": dorm_id})
        if dorm is None:
            raise HTTPException(status_code=404, detail="Dorm not found")
        return dorm

    @staticmethod
    async def update_dorm(dorm_id: str, dorm_update: DormUpdate) -> Dorm:
        update_result = await db.dorms.update_one({"_id": dorm_id}, {"$set": dorm_update.dict()})
        if update_result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Dorm not found or no changes made")
        return await DormService.get_dorm_by_id(dorm_id)

    @staticmethod
    async def delete_dorm(dorm_id: str) -> None:
        delete_result = await db.dorms.delete_one({"_id": dorm_id})
        if delete_result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Dorm not found")