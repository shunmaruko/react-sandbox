from openapi_server.models.message import Message
from openapi_server.models.user import User
from openapi_server.apis.auth_api_base import BaseAuthApi

class AuthApiImpl(BaseAuthApi):
    def get_user_auth_me_get(self) -> User:
        #print(User(email="hoge@gmail.com", roles=["ADMIN", "GENERAL"]))
        return User(email="hoge@gmail.com", roles=["ADMIN"])
    
    def login_auth_login_post(self, email: str, password: str) -> User:
        return User(email=email)
    
    def logout_auth_logout_post(self) -> None:
        return
    
    def register_auth_register_post(self, email: str, role: str, password: str) -> Message:
        return Message(message=f"email: {email}, role: {role}, password: {password}")
    