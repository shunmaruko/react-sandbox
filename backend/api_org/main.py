from typing import Final
import json 
import base64

from fastapi import FastAPI, status, HTTPException
from fastapi.responses import JSONResponse
from pydantic import EmailStr

from api_org.schema import UserDTO

app = FastAPI()

_AUTH_COOKIE: Final[str] = "react-ts-sandbox-server-test"

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/auth/me")
async def get_user():
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