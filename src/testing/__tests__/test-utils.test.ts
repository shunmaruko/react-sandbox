import { renderApp } from "@/testing/test-utils";

test("should login as admin user", async () => {
  const res = await renderApp(undefined, "ADMIN");
  expect(res.user?.role).toBe("ADMIN");
});

test("should login as general user", async () => {
  const res = await renderApp(undefined, "USER");
  expect(res.user?.role).toBe("USER");
});

test("should not login ", async () => {
  const res = await renderApp(undefined);
  expect(res.user?.role).toBeUndefined();
});
