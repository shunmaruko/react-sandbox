//import { worker } from "@/testing/mocks/browser";
import { initializeDb, resetDb } from "@/testing/mocks/db";
//resetDb();

export const enableMocking = async () => {
  const { worker } = await import("@/testing/mocks/browser");
  initializeDb();
  return worker.start({ onUnhandledRequest: "bypass" });
};
