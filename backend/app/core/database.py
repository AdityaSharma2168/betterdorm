from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from app.core.config import settings

client = AsyncIOMotorClient(settings.MONGODB_URL)
database = client[settings.MONGODB_DB_NAME]

def get_collection(collection_name: str):
    return database[collection_name]

def serialize_id(data):
    if isinstance(data, list):
        return [serialize_id(item) for item in data]
    if isinstance(data, dict):
        data['id'] = str(data['_id'])
        del data['_id']
        return data
    return data