from __future__ import annotations

from typing import Annotated
from logging import getLogger

from fastapi import Depends, Security  # noqa: F401
from fastapi.openapi.models import OAuthFlowImplicit, OAuthFlows  # noqa: F401
from fastapi.security import (  # noqa: F401
    HTTPAuthorizationCredentials,
    HTTPBasic,
    HTTPBasicCredentials,
    HTTPBearer,
    OAuth2,
    OAuth2AuthorizationCodeBearer,
    OAuth2PasswordBearer,
    SecurityScopes,
)
from fastapi.security.api_key import APIKeyCookie, APIKeyHeader, APIKeyQuery  # noqa: F401
from fastapi import HTTPException, status
from pydantic import ValidationError, EmailStr
from jwt.exceptions import InvalidTokenError
import jwt 
from passlib.context import CryptContext

from openapi_server.models.extra_models import TokenModel
from openapi_server.models.user import User
from openapi_server.security_scheme import OAuth2ImpclicitBearer
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
        "roles": ["general"],
    }
}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserInDB(User):
    disabled: bool
    hashed_password: str

oauth2_implicit = OAuth2ImpclicitBearer( # OAuth2
    flows=OAuthFlows(
        implicit=OAuthFlowImplicit(
            authorizationUrl="http://0.0.0.0:8080/v1/auth/authorization",
            scopes={
                "admin": "administrator",
                "general": "general user",
            }
        )
    )
)

    

def get_user(db, email: EmailStr):
    if email in db:
        user_dict = db[email]
        if len(user_dict["roles"]) > 0: # role must be obtained from db
            return UserInDB(**user_dict)
    

def validate_scope_auth(
    required_scopes: list[str], token_scopes: list[str]
) -> bool:
    """
    Validate required scopes are included in token scope

    :param required_scopes Required scope to access called API
    :type required_scopes: list[str]
    :param token_scopes Scope present in token
    :type token_scopes: list[str]
    :return: True if access to called API is allowed
    :rtype: bool
    """
    for scope in required_scopes:
        if scope not in token_scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": "Bearer"},
            )
    return True

def get_token_auth(
    security_scopes: SecurityScopes, token: str = Depends(oauth2_implicit)
) -> TokenModel:
    """
    Validate and decode token.

    :param token Token provided by Authorization header
    :type token: str
    :return: Decoded token information or None if token is invalid
    :rtype: TokenModel | None
    """
    # TODO(shunmaruko) consider better way to use bearer token in implicit flow
    # scheme, _, token = token_header.partition(" ")
    # if scheme != "Bearer":
    #   raise HTTPException(
    #                   status_code=status.HTTP_401_UNAUTHORIZED,
    #                   detail="Not authenticated",
    #                   headers={"WWW-Authenticate": "Bearer"},
    #               )
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
        email: EmailStr = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_scopes = payload.get("scopes", [])
        token_data = TokenModel(scopes=token_scopes, sub=email)
        
    except (InvalidTokenError, ValidationError):
        raise credentials_exception
    user = get_user(fake_users_db, email=token_data.sub)
    if user is None:
        raise credentials_exception
    if user.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
    if validate_scope_auth(token_data.scopes, security_scopes.scopes):
        return TokenModel(sub=user.email, scopes=user.roles)

def get_token_api_key(
    token_api_key_header: str = Security(
        APIKeyHeader(name="api_key", auto_error=False)
    ),
) -> TokenModel:
    """
    Check and retrieve authentication information from api_key.

    :param token_api_key_header API key provided by Authorization[api_key] header
    
    
    :type token_api_key_header: str
    :return: Information attached to provided api_key or None if api_key is invalid or does not allow access to called API
    :rtype: TokenModel | None
    """

    ...
