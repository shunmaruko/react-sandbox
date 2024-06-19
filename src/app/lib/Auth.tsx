import { configureAuth } from "react-query-auth";

import { Api } from "./api-client";
import { RegisterInput, AuthResponse, User, LoginInput } from "./auth.type";

const LoginUser = (data: LoginInput): Promise<AuthResponse> => {
  return Api.post("/auth/login", data);
};

const RegisterUser = (data: RegisterInput): Promise<AuthResponse> => {
  return Api.post("/auth/register", data);
};

const authConfig = {
  userFn: (): Promise<User> => Api.get("/auth/me"),
  loginFn: async (data: LoginInput): Promise<User> => {
    const response = await LoginUser(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput): Promise<User> => {
    const response = await RegisterUser(data);
    return response.user;
  },
  logoutFn: (): Promise<void> => Api.post("/auth/logout"),
};

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth(authConfig);
