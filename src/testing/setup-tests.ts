//import { beforeAll, beforeEach, afterEach, afterAll } from "vitest";
import "@testing-library/jest-dom";
import { initializeDb, resetDb } from "@/testing/mocks/db";
import { server } from "@/testing/mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
beforeEach(() => {
  initializeDb();
});
afterEach(() => {
  server.resetHandlers();
  resetDb();
});
afterAll(() => {
  server.close();
});
