from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.routers import upload, transcribe, summarize, meetings
from app.settings import settings
from app.utils.pubsub import PubSub

app = FastAPI(title="InsightFlow API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/upload", tags=["upload"])
app.include_router(transcribe.router, prefix="/transcribe", tags=["transcribe"])
app.include_router(summarize.router, prefix="/summarize", tags=["summarize"])
app.include_router(meetings.router, prefix="/meetings", tags=["meetings"])

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.websocket("/ws/status")
async def ws_status(websocket: WebSocket, task_id: str):
    await websocket.accept()
    pub = PubSub(settings.redis_url)
    channel = f"status:{task_id}"
    ps = await pub.subscribe(channel)
    try:
        async for message in ps.listen():
            if message and message.get("type") == "message":
                await websocket.send_text(message.get("data", "{}"))
    except WebSocketDisconnect:
        pass
    finally:
        await ps.unsubscribe(channel)
