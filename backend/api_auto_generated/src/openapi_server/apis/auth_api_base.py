# coding: utf-8
from abc import ABC

from typing import ClassVar, Dict, List, Tuple  # noqa: F401

from openapi_server.models.http_validation_error import HTTPValidationError
from openapi_server.models.message import Message
from openapi_server.models.user import User


class BaseAuthApi(ABC):
    subclasses: ClassVar[Tuple] = ()

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        BaseAuthApi.subclasses = BaseAuthApi.subclasses + (cls,)
    def get_user_auth_me(
        self,
    ) -> User:
        """Return user info if authed."""
        ...


    def login_auth_login_post(
        self,
        email: str,
        password: str,
    ) -> User:
        """Login."""
        ...


    def logout_auth_logout_post(
        self,
    ) -> None:
        """Logout."""
        ...


    def register_auth_register_post(
        self,
        email: str,
        role: str,
        password: str,
    ) -> Message:
        """Register."""
        ...
