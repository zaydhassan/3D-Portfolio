from app.celery_app import celery_app
from app.settings import settings
from app.utils.pubsub import PubSub
from openai import OpenAI

@celery_app.task(bind=True, name="app.tasks.summarize.summarize_text")
def summarize_text(self, transcript_text: str):
    client = OpenAI(api_key=settings.openai_api_key)
    task_id = self.request.id
    pub = PubSub(settings.redis_url)

    import asyncio; asyncio.run(pub.publish(f"status:{task_id}", {"state": "STARTED"}))

    prompt = (
        "You are an expert meeting assistant. Summarize the meeting in 5-8 bullet points, "
        "then extract concise action items as a checklist with owners and due dates if mentioned."
    )
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": transcript_text},
        ],
        temperature=0.2,
    )
    content = response.choices[0].message.content
    result = {"summary": content}
    import asyncio; asyncio.run(pub.publish(f"status:{task_id}", {"state": "SUCCESS", "result": result}))
    return result
