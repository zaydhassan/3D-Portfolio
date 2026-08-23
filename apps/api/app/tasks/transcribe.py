import tempfile
from pathlib import Path
import httpx
from app.celery_app import celery_app
from app.settings import settings
from app.utils.pubsub import PubSub
from openai import OpenAI

@celery_app.task(bind=True, name="app.tasks.transcribe.transcribe_audio")
def transcribe_audio(self, file_url: str):
    client = OpenAI(api_key=settings.openai_api_key)
    task_id = self.request.id

    pub = PubSub(settings.redis_url)
    # publish started
    import asyncio; asyncio.run(pub.publish(f"status:{task_id}", {"state": "STARTED"}))

    with tempfile.TemporaryDirectory() as tmpdir:
        tmp_path = Path(tmpdir) / "audio.m4a"
        with httpx.stream("GET", file_url, timeout=60.0) as r:
            r.raise_for_status()
            with open(tmp_path, "wb") as f:
                for chunk in r.iter_bytes():
                    f.write(chunk)

        with open(tmp_path, "rb") as f:
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                file=f,
            )

    result = {"text": transcription.text}
    import asyncio; asyncio.run(pub.publish(f"status:{task_id}", {"state": "SUCCESS", "result": result}))
    return result
