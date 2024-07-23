from __future__ import annotations

from pydantic import BaseModel, Field

class TokenModel(BaseModel):
    """Defines a token model."""

    sub: str = Field(description="user email.")
    scopes: list[str] = Field(default=[], description="user roles.")
