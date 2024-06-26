import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/app/lib/Auth";
import { AppRoot } from "@/app/routes/app/Route";
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
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          lazy: async () => {
            return { Component: () => <>Root page</> };
          },
        },
        {
          path: "sample",
          lazy: async () => {
            const { ProtectedSample } = await import("./app/Sample");
            return { Component: ProtectedSample };
          },
        },
      ],
    },
  ]);

export default CreateRouter;
