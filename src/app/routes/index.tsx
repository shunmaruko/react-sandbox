import { createBrowserRouter } from "react-router-dom";

const CreateRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { Landing } = await import("./Landing");
        return { Component: Landing };
      },
    },
  ]);

export default CreateRouter;
