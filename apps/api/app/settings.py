from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    cors_allow_origins: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    database_url: str = "postgresql://insightflow:insightflow@postgres:5432/insightflow"
    redis_url: str = "redis://redis:6379/0"
    s3_bucket: str = ""
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    openai_api_key: str = ""
    stripe_secret_key: str = ""

settings = Settings()