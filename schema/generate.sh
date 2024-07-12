#!/bin/bash
# generate backend
openapi-generator generate -i openapi.yaml -t backend-template -g python-fastapi -o ../backend/api_auto_generated
# generate frontend
cd ../frontend && npm run gen-api && cd -