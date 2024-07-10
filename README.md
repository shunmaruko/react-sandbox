# Overview 
This repo is a Single Page Application with schema first approach for backend/frontend api server/client, code first approach for database. Tech Stacks are:

- Frontend
  - [React](https://ja.react.dev/) (Typescript) for frontend.
  - [MaterialUI](https://material-ui.com/) (>= v5.0.0) for UI component library. For styling, we use [styled utility](https://mui.com/system/styled/).
  - [eslint](https://eslint.org/) as linter.
  - [Prettier](https://prettier.io/) as formatter.
  - [Jest](https://jestjs.io/ja/) for unit tests.
  - [Testing libraray](https://testing-library.com/docs/react-testing-library/) for integration tests.
  - [Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API) as API client.
  - [React query](https://tanstack.com/query/latest/docs/framework/react/overview) for state management.
  - [Storybook](https://storybook.js.org/) for UI catalog and documentation.
  - [openapi-codegen](https://github.com/fabien0102/openapi-codegen) to automatically generate api client and react query hooks from schema.

- Backend
  - [FastAPI](https://fastapi.tiangolo.com/ja/)(Python 3.11) for backend.
  - [PostgreSQL](https://www.postgresql.org/) for the database.
  - [SqlAlchemy](https://www.sqlalchemy.org/) for ORM.
  - [Celery](http://www.celeryproject.org/) for background tasks.
  - [Alembic](https://alembic.sqlalchemy.org/en/latest/) for database migrations.
  - [Pytest](https://docs.pytest.org/en/latest/) for backend tests.
  - [Ruff](https://docs.astral.sh/ruff/) as linter and formatter.
  - [openapi-generator](https://github.com/OpenAPITools/openapi-generator) to automatically generate api server from schema.
  
- Infra

# Docker compose 
Docker compose is a tool to define and run multi-container applications.
If you want to only build containers, you can run 
```sh
./react-ts-sandbox $ docker compose build
```
To create and start containers containers, 
```sh
./react-ts-sandbox $ docker compose up
```
If you want run on background, 
```sh
./react-ts-sandbox $ docker compose up -d 
```
To start|restart|stop|kill,  
```sh
./react-ts-sandbox $ docker compose start|restart|stop|kill
```

Very simple cheetsheet is [here](https://blog.kasei-san.com/entry/2018/03/12/060801)