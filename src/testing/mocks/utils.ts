import { db } from "@/testing/mocks/db";

export const hash = (str: string) => "hash-" + str;

export const encode = (obj: any) => window.btoa(JSON.stringify(obj));

export const decode = (str: string) => JSON.parse(window.atob(str));

const omit = <T extends object>(obj: T, keys: string[]): T => {
  const result = {} as T;
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

export const sanitizeUser = <O extends object>(user: O) =>
  omit<O>(user, ["password", "iat"]);

export const authenticate = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user);
    const encodedToken = encode(sanitizedUser);
    return { user: sanitizedUser, jwt: encodedToken };
  }

  const error = new Error("Invalid username or password");
  throw error;
};

export const AUTH_COOKIE = `react_sandbox_token`;

export const requireAuth = (
  cookies: Record<string, string>,
  shouldThrow = true,
) => {
  try {
    // todo: fix once tests in Github Actions are fixed
    // const encodedToken = cookies[AUTH_COOKIE];
    const encodedToken = cookies[AUTH_COOKIE];
    if (!encodedToken) {
      if (shouldThrow) {
        throw new Error("No authorization token provided!");
      }

      return null;
    }
    const decodedToken = decode(encodedToken) as { id: string };

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });
    if (!user) {
      if (shouldThrow) {
        throw Error("Unauthorized");
      }
      return null;
    }

    return sanitizeUser(user);
  } catch (err: any) {
    throw new Error(err);
  }
};
