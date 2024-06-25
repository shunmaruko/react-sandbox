import { setupServer } from "msw/node";

import { handlers } from "./handlers";
import { db } from "@/testing/mocks/db";

export const server = setupServer(...handlers, ...db.user.toHandlers("rest"));
