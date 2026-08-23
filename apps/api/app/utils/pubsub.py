import asyncio
import json
from typing import Any, Dict
from redis.asyncio import Redis

class PubSub:
    def __init__(self, url: str) -> None:
        self._redis = Redis.from_url(url, decode_responses=True)

    async def publish(self, channel: str, message: Dict[str, Any]) -> None:
        await self._redis.publish(channel, json.dumps(message))

    async def subscribe(self, channel: str):
        pubsub = self._redis.pubsub()
        await pubsub.subscribe(channel)
        return pubsub

    async def close(self) -> None:
        await self._redis.aclose()
