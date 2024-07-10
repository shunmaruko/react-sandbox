
# Backend
To generate web server, we use [openapi-generator](https://github.com/OpenAPITools/openapi-generator). Mustache templates are fetched from [resource directory](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator/src/main/resources) with the following command.

```sh
react-ts-sandbox/schema $ openapi-generator author template -g python-fastapi -o ./backend-template
```

General steps:
  1. Define shema.
    Just edit [openapi.yaml](./openapi.yaml). The only rule is to add description to every api entry point.
    Without it, openapi generator fails to add BaseApi.
  
  1. Generate server code.
      ```sh
      react-ts-sandbox/schema $ openapi-generator generate -i openapi.yaml -t backend-template -g python-fastapi -o ../backend/api_auto_generated
      ```
      
  1. Add impl code.
  
     In the latest openapi generator, impl class is introduced so that developer can clearly understand where is auto generated or should be implemented by developer. 
     
     So after previous step, create your favorite filename under [impl directory](../backend/api_auto_generated/src/openapi_server/impl/), inherit BaseXxxApi class and implement it. On runtime, BaseXxxApi automatically find subclass of itself, and call actual implementation, which is realized by builtin [__init__subclass__](https://docs.python.org/ja/3/reference/datamodel.html#object.__init_subclass__) added from python 3.6.
     
  1. Finally run on docker by the following command.
      ```sh
      react-ts-sandbox/backend/api_auto_generated $ docker-compose up
      ```

## TODO
    - Curently docker rebuild package when files under src are edited. This is because, openapi_server is packaged and regarded as part of python module. To improve the performance we should add layer that only install third party library, and then add apis.
    
# Frontend