from celery import Celery
from app.settings import settings

celery_app = Celery(
    "insightflow",
    broker=settings.redis_url,
    backend=settings.redis_url,
)

celery_app.conf.update(
    task_routes={
        "app.tasks.transcribe.*": {"queue": "transcribe"},
        "app.tasks.summarize.*": {"queue": "summarize"},
    },
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
)
