from logging import getLogger

from pydantic import EmailStr, StrictStr
from datetime import datetime, timedelta, timezone


from fastapi import status, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
from pydantic import EmailStr, ValidationError
from passlib.context import CryptContext
import jwt 

from openapi_server.models.user import User
from openapi_server.apis.auth_api_base import BaseAuthApi
from openapi_server.models.extra_models import TokenModel
logger = getLogger('uvicorn.info')

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

fake_users_db = {
    "johndoe@example.com": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserInDB(User):
    disabled: bool
    hashed_password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)



def get_user(db, email: EmailStr):
    if email in db:
        user_dict = db[email]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, email: EmailStr, password: str):
    user = get_user(fake_db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


class AuthApiImpl(BaseAuthApi):

    def authorization(self, response_type: str, client_id: str, redirect_uri: str, scope: list[str], state: str) -> None:
        """Implemented based on https://datatracker.ietf.org/doc/html/rfc6749#section-4.2"""
        if response_type != "token":
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported response type")
        # TODO(shunmaruko): impl one time password
        password = "secret"
        user_in_db = UserInDB(email=client_id, roles=scope, disabled=False, hashed_password=get_password_hash(password))
        user = User(email=user_in_db.email, roles=user_in_db.roles)
        expires_in = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)   
        access_token = create_access_token(
            data={"sub": user.email, "scopes": user.roles}, expires_delta=expires_in
        )
        token_type = "bearer"
        url = ""
        if redirect_uri:
            url += redirect_uri
        url += f"#access_token={access_token}&token_type={token_type}"
        if expires_in:
            url += f"&expires_in={expires_in}"
        if len(scope) > 0:
            scpoe_str = "%20".join(scope) # %20 is escape sequence for space 
            url += f"&scope={scpoe_str}"
        if state:
            url += f"&state={state}"
        logger.info("debug")
        logger.info(url)
        return RedirectResponse(url=url)
    
    def me(self, token_auth: TokenModel) -> User:
        return User(email=token_auth.sub, roles=token_auth.scopes)
    
    def login(self, email: str, password: str) -> User:
        return User(email=email)
    
    def logout(self) -> None:
        return
    
    def register(self, email: str, password: str) -> object:
        #if email in fake_users_db:
        #    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User aleady exists.")
        user_in_db = UserInDB(email=email, roles=["general"], disabled=False, hashed_password=get_password_hash(password))
        user = User(email=user_in_db.email, roles=user_in_db.roles)
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)      

        content =  {"message": "Register", **(user.model_dump())}
        jwt = create_access_token(
            data={"sub": user.email, "scopes": user.roles}, expires_delta=access_token_expires
        )
        headers = {"Set-Cookie": f"react-ts-sandbox={jwt}; Path=/; HttpOnly",}
        return JSONResponse(content=content, status_code=status.HTTP_201_CREATED, headers=headers)
    
