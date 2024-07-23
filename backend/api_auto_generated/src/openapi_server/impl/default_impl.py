from fastapi.responses import RedirectResponse

from openapi_server.apis.default_api_base import BaseDefaultApi

class DefaultApi(BaseDefaultApi):
    def root_get(self) -> object:
        return {"message": "root"}