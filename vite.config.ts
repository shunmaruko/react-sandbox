/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    setupFiles: "./src/testing/setup-tests.ts",
    globals: true,
    environment: "happy-dom",
  },
});
