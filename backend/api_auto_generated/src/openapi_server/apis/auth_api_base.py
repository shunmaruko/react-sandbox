# coding: utf-8
from abc import ABC

from typing import ClassVar, Dict, List, Tuple  # noqa: F401

from openapi_server.models.http_validation_error import HTTPValidationError
from openapi_server.models.user import User
from openapi_server.security_api import get_token_auth
from openapi_server.models.extra_models import TokenModel  # noqa: F401

class BaseAuthApi(ABC):
    subclasses: ClassVar[Tuple] = ()

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        BaseAuthApi.subclasses = BaseAuthApi.subclasses + (cls,)
    def authorization(
        self,
        response_type: str
        , 
        client_id: str
        , 
        redirect_uri: str
        , 
        scope: List[str]
        , 
        state: str
        
        
    ) -> None:
        """Authorization Request spec. For detail, see https://datatracker.ietf.org/doc/html/rfc6749#section-4.2."""
        ...


    def login(
        self,
        email: str
        , 
        password: str
        
        
    ) -> User:
        """Login."""
        ...


    def logout(
        self,
        
    ) -> None:
        """Logout."""
        ...


    def me(
        self,
        token_auth: TokenModel,
    ) -> User:
        """Return user info if authed."""
        ...


    def register(
        self,
        email: str
        , 
        password: str
        
        
    ) -> object:
        """Register."""
        ...
