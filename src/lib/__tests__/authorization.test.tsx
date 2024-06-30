import { screen, waitFor } from "@testing-library/react";

import { renderApp } from "@/testing/test-utils";
import { Authorization } from "@/lib/authorization";

test("should login as admin user", async () => {
  // TODO seacrh way to get result
  //const protectedResource = "This is very confidential data";
  const expected = "Loading ...";
  await renderApp(
    <Authorization allowedRoles={["ADMIN"]}>sample</Authorization>,
    "ADMIN",
  );
  expect(screen.getByText(expected)).toBeInTheDocument();
});
