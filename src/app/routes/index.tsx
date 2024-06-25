import { createBrowserRouter } from "react-router-dom";

const CreateRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./Landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: "/auth/register",
      lazy: async () => {
        const { RegisterRoute } = await import("./auth/Register");
        return { Component: RegisterRoute };
      },
    },
    {
      path: "/auth/login",
      lazy: async () => {
        const { LoginRoute } = await import("./auth/Login");
        return { Component: LoginRoute };
      },
    },
    {
      path: "/sample",
      lazy: async () => {
        const { Sample } = await import("./Sample");
        return { Component: Sample };
      },
    },
    {
      path: "/app",
      lazy: async () => {
        const { AppRoot } = await import("./app/Route");
        return { Component: AppRoot };
      },
    },
  ]);

export default CreateRouter;
