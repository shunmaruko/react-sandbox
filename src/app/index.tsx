// import from external
import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";

// import from parent
import AppPrivider from "@/app/app-provider";
import CreateRouter from "@/app/routes";

// import from index
import "./App.css";

const AppRouter = () => {
  const router = useMemo(() => CreateRouter(), []);
  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AppPrivider>
      <AppRouter />
    </AppPrivider>
  );
};

export default App;
