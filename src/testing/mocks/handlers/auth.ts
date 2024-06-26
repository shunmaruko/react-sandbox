import { HttpResponse, http, delay, PathParams } from "msw";

import { RegisterInput, LoginInput } from "@/app/lib/auth.type";
import { API_BASE_URL } from "@/config";
import { saveDb, db } from "@/testing/mocks/db";
import {
  AUTH_COOKIE,
  authenticate,
  hash,
  requireAuth,
} from "@/testing/mocks/utils";
//type ResponseStatus = { statusCode: StatusCode };
//type LoginRequestBody = LoginInput;

type RegisterParams = PathParams<never>;

type RegisterBody = RegisterInput;

type LoginBody = LoginInput;

type PostResponseBodyBadRequest = { type: "BadRequest"; message: string };
type PostResponseBodyServerError = {
  type: "InternalServerError";
  message: string;
};

type LoginResponseBody =
  | { type: "Created"; user: LoginInput }
  | PostResponseBodyBadRequest
  | PostResponseBodyServerError;

type RegisterResponseBody =
  | { type: "Created"; user: RegisterInput }
  | PostResponseBodyBadRequest
  | PostResponseBodyServerError;

type LogoutResponseBody = { message: string };

export const AuthHandlers = [
  http.post<RegisterParams, RegisterBody, RegisterResponseBody>(
    `${API_BASE_URL}auth/register`,
    async ({ request }) => {
      await delay(1000);
      try {
        const newUser = await request.json();
        const existingUser = db.user.findFirst({
          where: {
            email: {
              equals: newUser.email,
            },
          },
        });

        if (existingUser) {
          return HttpResponse.json({
            message: "The user already exists",
            type: "BadRequest",
          });
        }
        db.user.create({
          ...newUser,
          role: "GENERAL",
          password: hash(newUser.password),
        });
        saveDb("user");
        // TODO: add authentication
        const result = authenticate({
          email: newUser.email,
          password: newUser.password,
        });
        return HttpResponse.json(
          { type: "Created", user: result.user },
          {
            headers: {
              // with a real API servier, the token cookie should also be Secure and HttpOnly
              // TODO: set jwt with httponly attribute to cokkie
              "Set-Cookie": `${AUTH_COOKIE}=${result.jwt}; Path=/; HttpOnly`,
            },
            status: 201,
          },
        );
      } catch (error: any) {
        const message =
          error instanceof Error ? error.message : "Server Internal Error";
        return HttpResponse.json({
          message: message,
          type: "InternalServerError",
        });
      }
    },
  ),
  http.post<RegisterParams, LoginBody, LoginResponseBody>(
    `${API_BASE_URL}auth/login`,
    async ({ request }) => {
      await delay(1000);
      try {
        const loginUser = await request.json();
        const result = authenticate({
          email: loginUser.email,
          password: loginUser.password,
        });
        return HttpResponse.json(
          { type: "Created", user: result.user },
          {
            headers: {
              // with a real API servier, the token cookie should also be Secure and HttpOnly
              "Set-Cookie": `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
            },
          },
        );
      } catch (error: any) {
        const message =
          error instanceof Error ? error.message : "Server Internal Error";
        return HttpResponse.json({
          message: message,
          type: "InternalServerError",
        });
      }
    },
  ),
  http.post<PathParams<never>, undefined, LogoutResponseBody>(
    `${API_BASE_URL}auth/logout`,
    async () => {
      await delay(1000);
      return HttpResponse.json(
        { message: "Logged out" },
        {
          headers: {
            "Set-Cookie": `${AUTH_COOKIE}=; Path=/;`,
          },
        },
      );
    },
  ),
  http.get(`${API_BASE_URL}auth/me`, async ({ cookies }) => {
    await delay(1000);
    try {
      const user = requireAuth(cookies, false);
      return HttpResponse.json({ user: user });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        { status: 500 },
      );
    }
  }),
];
