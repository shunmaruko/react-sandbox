import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";
//import { db } from "@/testing/mocks/db";

export const worker = setupWorker(...handlers);
