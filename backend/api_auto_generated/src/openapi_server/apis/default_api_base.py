# coding: utf-8
from abc import ABC

from typing import ClassVar, Dict, List, Tuple  # noqa: F401


from openapi_server.models.extra_models import TokenModel  # noqa: F401

class BaseDefaultApi(ABC):
    subclasses: ClassVar[Tuple] = ()

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        BaseDefaultApi.subclasses = BaseDefaultApi.subclasses + (cls,)
    def root_get(
        self,
        
    ) -> object:
        """Sample description."""
        ...
