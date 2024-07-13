# coding: utf-8

from typing import Dict, List  # noqa: F401
import importlib
import pkgutil

from openapi_server.apis.auth_api_base import BaseAuthApi
import openapi_server.impl

from fastapi import (  # noqa: F401
    APIRouter,
    Body,
    Cookie,
    Depends,
    Form,
    Header,
    Path,
    Query,
    Response,
    Security,
    status,
)

from openapi_server.models.extra_models import TokenModel  # noqa: F401
from openapi_server.models.http_validation_error import HTTPValidationError
from openapi_server.models.message import Message
from openapi_server.models.user import User


router = APIRouter()

ns_pkg = openapi_server.impl
for _, name, _ in pkgutil.iter_modules(ns_pkg.__path__, ns_pkg.__name__ + "."):
    importlib.import_module(name)


@router.get(
    "/v1/auth/me",
    responses={
        200: {"model": User, "description": "Successful Response"},
    },
    tags=["auth"],
    summary="Get User",
    response_model_by_alias=True,
)
async def get_user_auth_me(
) -> User:
    """Return user info if authed."""
    return BaseAuthApi.subclasses[0]().get_user_auth_me_get()


@router.post(
    "/v1/auth/login",
    responses={
        200: {"model": User, "description": "Successful Response"},
        422: {"model": HTTPValidationError, "description": "Validation Error"},
    },
    tags=["auth"],
    summary="Login",
    response_model_by_alias=True,
)
async def login_auth_login_post(
    email: str = Query(None, description="", alias="email"),
    password: str = Query(None, description="", alias="password"),
) -> User:
    """Login."""
    return BaseAuthApi.subclasses[0]().login_auth_login_post(email, password)


@router.post(
    "/v1/auth/logout",
    responses={
        204: {"description": "No content"},
    },
    tags=["auth"],
    summary="Logout",
    response_model_by_alias=True,
)
async def logout_auth_logout_post(
) -> None:
    """Logout."""
    return BaseAuthApi.subclasses[0]().logout_auth_logout_post()


@router.post(
    "/v1/auth/register",
    responses={
        200: {"model": Message, "description": "Successful Response"},
        422: {"model": HTTPValidationError, "description": "Validation Error"},
    },
    tags=["auth"],
    summary="Register",
    response_model_by_alias=True,
)
async def register_auth_register_post(
    email: str = Query(None, description="", alias="email"),
    role: str = Query(None, description="", alias="role"),
    password: str = Query(None, description="", alias="password"),
) -> Message:
    """Register."""
    return BaseAuthApi.subclasses[0]().register_auth_register_post(email, role, password)
