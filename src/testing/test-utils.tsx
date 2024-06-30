import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import Cookies from "js-cookie";
import { db } from "@/testing/mocks/db";
import { Role } from "@/lib/auth.type";
import { AUTH_COOKIE, authenticate, unhash } from "./mocks/utils";
export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(screen.queryAllByText("/Vite + React/i"), {
    timeout: 4000,
  });

const loginAsUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const authUser = await authenticate({ email, password });
  Cookies.set(AUTH_COOKIE, authUser.jwt);
  return authUser.user;
};

export const getUser = async (role?: Role) => {
  const sampleUser = db.user.findFirst({
    where: {
      role: {
        equals: role,
      },
    },
  });
  if (sampleUser) {
    const res = await loginAsUser({
      email: sampleUser.email,
      password: unhash(sampleUser.password),
    });
    return res;
  }
};
