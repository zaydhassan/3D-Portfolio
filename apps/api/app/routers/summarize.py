from fastapi import APIRouter, HTTPException
from app.celery_app import celery_app
from app.settings import settings

router = APIRouter()

@router.post("/")
async def summarize_start(transcript_text: str):
    if not settings.openai_api_key:
        raise HTTPException(status_code=500, detail="OpenAI not configured")
    task = celery_app.send_task("app.tasks.summarize.summarize_text", args=[transcript_text])
    return {"task_id": task.id}

@router.get("/status/{task_id}")
async def summarize_status(task_id: str):
    result = celery_app.AsyncResult(task_id)
    return {"state": result.state, "result": result.result if result.ready() else None}
