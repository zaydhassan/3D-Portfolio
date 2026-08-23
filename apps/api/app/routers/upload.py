from fastapi import APIRouter, HTTPException
import aioboto3
from app.settings import settings
from uuid import uuid4
from datetime import timedelta, datetime

router = APIRouter()

@router.get("/")
async def get_presigned_post(content_type: str):
    if not settings.s3_bucket or not settings.aws_access_key_id:
        raise HTTPException(status_code=500, detail="S3 not configured")

    key = f"uploads/{datetime.utcnow().strftime('%Y/%m/%d')}/{uuid4()}.media"
    session = aioboto3.Session(
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
        region_name="us-east-1",
    )
    async with session.client("s3") as s3:
        presigned_post = await s3.generate_presigned_post(
            Bucket=settings.s3_bucket,
            Key=key,
            Fields={"Content-Type": content_type},
            Conditions=[["starts-with", "$Content-Type", ""]],
            ExpiresIn=int(timedelta(minutes=10).total_seconds()),
        )
    return {"key": key, "url": f"https://{settings.s3_bucket}.s3.amazonaws.com/{key}", "presigned": presigned_post}
