from typing import Final
import json 
import base64
from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import FastAPI, status, HTTPException, Depends, Security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm,  SecurityScopes
from fastapi.responses import JSONResponse
from pydantic import EmailStr, BaseModel, ValidationError
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
import jwt 

from api_org.schema import UserDTO

app = FastAPI()

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
    scopes: list[str] = []


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="token", 
    scopes={"me": "Read information about the current user.", "items": "Read items."},
    )

app = FastAPI()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
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

async def get_current_user(
    security_scopes: SecurityScopes, token: Annotated[str, Depends(oauth2_scheme)]
):
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = "Bearer"
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": authenticate_value},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_scopes = payload.get("scopes", [])
        token_data = TokenData(scopes=token_scopes, username=username)
    except (InvalidTokenError, ValidationError):
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    return user


async def get_current_active_user(
    current_user: Annotated[User, Security(get_current_user, scopes=["me"])],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "scopes": form_data.scopes}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]

_AUTH_COOKIE: Final[str] = "react-ts-sandbox-server-test"

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/auth/me")
async def get_user_authed():
    return {"user": "current user"}

@app.post("/auth/login")
async def login(email:EmailStr, password: str):
    user = UserDTO(email=email)
    if hash(password) != "hash-"+password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="password is not correct")
    content =  {"message": "Hello World", "user": user}
    jwt = base64.b64encode(json.JSONEncoder().encode(user.model_dump()).encode("utf-8"))
    # for decode base64.b64decode(jwt.decode("utf-8"))
    headers = {"Set-Cookie": f"{_AUTH_COOKIE}={jwt}; Path=/; HttpOnly",}
    return JSONResponse(content=content, status_code=status.HTTP_201_CREATED, headers=headers)

def hash(password: str):
    return "hash-"+password

@app.post("/auth/register")
async def register(email:EmailStr, role: str, password: str):
    user = UserDTO(email=email, role=role)
    content =  {"message": "Register", **(user.model_dump())}
    if role not in ["GENERAL", "ADMIN"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="role is not found in db")
    if hash(password) != "hash-"+password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="password is not correct")
    jwt = base64.b64encode(json.JSONEncoder().encode(user.model_dump()).encode("utf-8"))
    # for decode base64.b64decode(jwt.decode("utf-8"))
    headers = {"Set-Cookie": f"{_AUTH_COOKIE}={jwt}; Path=/; HttpOnly",}
    return JSONResponse(content=content, status_code=status.HTTP_201_CREATED, headers=headers)

@app.post("/auth/logout")
async def logout():
    content =  {"message": "Log out."}
    headers = {"Set-Cookie": f"{_AUTH_COOKIE}=; Path=/; HttpOnly",}
    return JSONResponse(content=content, status_code=status.HTTP_200_OK, headers=headers)

if __name__ == "__main__":
  import uvicorn
  uvicorn.run("main:app", reload=True)