import { db } from "@/testing/mocks/db";
import { authHandlers } from "@/testing/mocks/handlers/auth";
import { sampleHandlers } from "@/testing/mocks/handlers/sample";
export const handlers = [
  ...authHandlers,
  ...sampleHandlers,
  ...db.user.toHandlers("rest"),
];
