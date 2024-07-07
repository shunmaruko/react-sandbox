import React from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import { enableMocking } from "./testing/mocks";
import "./index.css";

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
