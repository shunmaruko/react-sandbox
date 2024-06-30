// import from external
import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";

// import from parent
import AppProvider from "@/app/app-provider";
import CreateRouter from "@/app/routes";

// import from index
import "./App.css";

const AppRouter = () => {
  const router = useMemo(() => CreateRouter(), []);
  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
