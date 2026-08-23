from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from prisma import Prisma
from pydantic import BaseModel
from app.deps.auth import get_current_user, AuthUser

router = APIRouter()

db = Prisma()

class MeetingCreate(BaseModel):
    title: str
    audio_url: Optional[str] = None

class MeetingUpdate(BaseModel):
    title: Optional[str] = None
    transcript: Optional[str] = None
    summary: Optional[str] = None
    action_items: Optional[List[str]] = None

@router.on_event("startup")
async def startup():
    await db.connect()

@router.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@router.get("/")
async def list_meetings(user: AuthUser = Depends(get_current_user)):
    return await db.meeting.find_many(where={'userId': user.user_id}, order={'createdAt': 'desc'})

@router.post("/")
async def create_meeting(payload: MeetingCreate, user: AuthUser = Depends(get_current_user)):
    return await db.meeting.create(data={
        'title': payload.title,
        'audioUrl': payload.audio_url,
        'userId': user.user_id,
    })

@router.get("/{meeting_id}")
async def get_meeting(meeting_id: str, user: AuthUser = Depends(get_current_user)):
    meeting = await db.meeting.find_first(where={'id': meeting_id, 'userId': user.user_id})
    if not meeting:
        raise HTTPException(status_code=404, detail='Not found')
    return meeting

@router.patch("/{meeting_id}")
async def update_meeting(meeting_id: str, payload: MeetingUpdate, user: AuthUser = Depends(get_current_user)):
    data = payload.model_dump(exclude_unset=True)
    existing = await db.meeting.find_first(where={'id': meeting_id, 'userId': user.user_id})
    if not existing:
        raise HTTPException(status_code=404, detail='Not found')
    return await db.meeting.update(where={'id': meeting_id}, data={
        'title': data.get('title'),
        'transcript': data.get('transcript'),
        'summary': data.get('summary'),
        'actionItems': data.get('action_items'),
    })

@router.delete("/{meeting_id}")
async def delete_meeting(meeting_id: str, user: AuthUser = Depends(get_current_user)):
    existing = await db.meeting.find_first(where={'id': meeting_id, 'userId': user.user_id})
    if not existing:
        raise HTTPException(status_code=404, detail='Not found')
    await db.meeting.delete(where={'id': meeting_id})
    return {"ok": True}
