//import { beforeAll, beforeEach, afterEach, afterAll } from "vitest";
import { server } from "@/testing/mocks/server";
import { initializeDb, resetDb } from "@/testing/mocks/db";

beforeAll(() => {
  console.log("before all called");
  server.listen({ onUnhandledRequest: "error" });
});
beforeEach(() => {
  console.log("before each called");
  initializeDb();
});
afterEach(() => {
  console.log("after each called");
  server.resetHandlers();
  resetDb();
});
afterAll(() => {
  console.log("after all called");
  server.close();
});
