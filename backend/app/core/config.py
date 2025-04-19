from pydantic import BaseSettings

class Settings(BaseSettings):
    mongodb_url: str
    mongodb_db: str
    google_maps_api_key: str
    ai_chatbot_endpoint: str

    class Config:
        env_file = ".env"

settings = Settings()