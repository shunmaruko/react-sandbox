import { configureAuth } from "react-query-auth";
import { redirect, useLocation } from "react-router-dom";

import { Api } from "./api-client";
import { RegisterInput, AuthResponse, User, LoginInput } from "./auth.type";

const LoginUser = (data: LoginInput): Promise<AuthResponse> => {
  return Api.post("/auth/login", data);
};

const RegisterUser = (data: RegisterInput): Promise<AuthResponse> => {
  return Api.post("/auth/register", data);
};

const authConfig = {
  userFn: async (): Promise<User> => {
    const response = await Api.get("/auth/me");
    //TODO: check the reason why direct call does't work
    return response.data.user;
  },
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

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return redirect(
      `/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`,
    );
  }

  return children;
};
