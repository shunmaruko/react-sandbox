import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "@/lib/auth";
import { AppRoot } from "@/app/routes/app/route";
const CreateRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: "/auth/register",
      lazy: async () => {
        const { RegisterRoute } = await import("./auth/register");
        return { Component: RegisterRoute };
      },
    },
    {
      path: "/auth/login",
      lazy: async () => {
        const { LoginRoute } = await import("./auth/login");
        return { Component: LoginRoute };
      },
    },
    {
      path: "/sample",
      lazy: async () => {
        const { Sample } = await import("./sample");
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
            const { ProtectedSample } = await import("./app/sample");
            return { Component: ProtectedSample };
          },
        },
      ],
    },
  ]);

export default CreateRouter;
