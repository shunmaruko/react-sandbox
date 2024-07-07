# React + TypeScript + Vite

To install packcakge,

```sh
npm i
```

To start server in development mode,

```sh
npm run dev
```

# Docker

To build image,

```sh
react-ts-sandbox$ docker build --tag sandbox-frontend .
```

To run it on container,

```sh
react-ts-sandbox$ docker run -it --rm  -p 5173:5173 sandbox-frontend
```

- `-it`

  Interactive mode.

- `--rm`

  Container is removerd when exit.

- `-p [host port]:[container port]`

  Port forwarding from container to host port.

Now you can access to [http://localhost:5173/](http://localhost:5173/).

(Optional)To stop and remove container manually, you can run

```sh
react-ts-sandbox$ docker rm -f sandbox-frontend
```

# API client

We use openapi-codegen to automatically generate fetch api(as api client) and react query (as react query).

To add new apis, you can proceed with the following steps.

1. Edit openapi.yaml.

1. Generate client by 'npm run gen-api'

1. Import components,

```ts
import { useXXX } from "@/auto-generated/sandboxComponents";

const SomeComponent = () =>{
    const { data, error, isLoading } = useXXX(...);
    if (error) {
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
    if (isLoading){
      return (<div>Loading…</div>)
    }
    return (
      <>
      // implement using data
      </>
    )

  }
}
```
