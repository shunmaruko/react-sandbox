import { render } from "@testing-library/react";
import Cookies from "js-cookie";

import { db } from "@/testing/mocks/db";
import { Role } from "@/lib/auth.type";
import { AUTH_COOKIE, authenticate, unhash } from "./mocks/utils";
import App from "@/app";

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
const getUser = async (role?: Role) => {
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
export const renderApp = async (children: React.ReactNode, role?: Role) => {
  const user = await getUser(role);
  const res = {
    ...render(children, {
      wrapper: App,
    }),
    user: user,
  };
  return res;
};
