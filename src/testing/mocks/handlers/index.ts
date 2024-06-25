import { AuthHandlers } from "@/testing/mocks/handlers/auth";
import { SampleHandlers } from "@/testing/mocks/handlers/sample";
import { db } from "@/testing/mocks/db";
export const handlers = [
  ...AuthHandlers,
  ...SampleHandlers,
  ...db.user.toHandlers("rest"),
];
