import { initializeDb } from "@/testing/mocks/db";

export const enableMocking = async () => {
  const { worker } = await import("@/testing/mocks/browser");
  initializeDb();
  return worker.start({ onUnhandledRequest: "bypass" });
};
