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
from openapi_server.models.user import User
from openapi_server.security_api import get_token_auth

router = APIRouter()

ns_pkg = openapi_server.impl
for _, name, _ in pkgutil.iter_modules(ns_pkg.__path__, ns_pkg.__name__ + "."):
    importlib.import_module(name)


@router.get(
    "/v1/auth/authorization",
    responses={
        302: {"description": "Redirect to the client with the access token"},
        400: {"description": "Invalid request"},
        401: {"description": "Unauthorized"},
    },
    tags=["auth"],
    summary="Authorize user.",
    response_model_by_alias=True,
)
async def authorization(
    response_type: str = Query(None, description="", alias="response_type"),
    client_id: str = Query(None, description="The client identifier. We use email as it.", alias="client_id"),
    redirect_uri: str = Query('', description="The URI to redirect to after authorization.", alias="redirect_uri"),
    scope: List[str] = Query(["general"], description="A list of scopes expressed as a list of space-delimited, case-sensitive strings. default is [general]", alias="scope"),
    state: str = Query('', description="RECOMMENDED.  An opaque value used by the client to maintain state between the request and callback.", alias="state"),
) -> None:
    """Authorization Request spec. For detail, see https://datatracker.ietf.org/doc/html/rfc6749#section-4.2."""
    return BaseAuthApi.subclasses[0]().authorization(response_type, client_id, redirect_uri, scope, state)


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
async def login(
    email: str = Query(None, description="", alias="email"),
    password: str = Query(None, description="", alias="password"),
) -> User:
    """Login."""
    return BaseAuthApi.subclasses[0]().login(email, password)


@router.post(
    "/v1/auth/logout",
    responses={
        204: {"description": "No content"},
    },
    tags=["auth"],
    summary="Logout",
    response_model_by_alias=True,
)
async def logout(
) -> None:
    """Logout."""
    return BaseAuthApi.subclasses[0]().logout()


@router.get(
    "/v1/auth/me",
    responses={
        200: {"model": User, "description": "Successful Response"},
    },
    tags=["auth"],
    summary="Get User",
    response_model_by_alias=True,
)
async def me(
    token_auth: TokenModel = Security(
        get_token_auth, scopes=["admin", "general"]
    ),
) -> User:
    """Return user info if authed."""
    return BaseAuthApi.subclasses[0]().me(token_auth,)


@router.post(
    "/v1/auth/register",
    responses={
        200: {"model": object, "description": "Successful Response"},
        422: {"model": HTTPValidationError, "description": "Validation Error"},
    },
    tags=["auth"],
    summary="Register",
    response_model_by_alias=True,
)
async def register(
    email: str = Query(None, description="", alias="email"),
    password: str = Query(None, description="", alias="password"),
) -> object:
    """Register."""
    return BaseAuthApi.subclasses[0]().register(email, password)
