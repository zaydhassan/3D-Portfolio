from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from app.settings import settings

bearer_scheme = HTTPBearer(auto_error=False)

class AuthUser:
  def __init__(self, user_id: str):
    self.user_id = user_id

async def get_current_user(creds: HTTPAuthorizationCredentials | None = Depends(bearer_scheme)) -> AuthUser:
  if creds is None:
    raise HTTPException(status_code=401, detail="Missing token")
  token = creds.credentials
  try:
    # Clerk JWTs can be verified via JWKS in production; here we decode without verify for scaffold
    payload = jwt.get_unverified_claims(token)
    sub = payload.get("sub") or payload.get("user_id")
    if not sub:
      raise ValueError("No sub in token")
    return AuthUser(user_id=sub)
  except Exception:
    raise HTTPException(status_code=401, detail="Invalid token")
