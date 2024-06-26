import { configureAuth } from "react-query-auth";
import { Navigate, useLocation } from "react-router-dom";

import { Api } from "./api-client";
import { RegisterInput, AuthResponse, User, LoginInput } from "./auth.type";

const LoginUser = (data: LoginInput): Promise<AuthResponse> => {
  return Api.post("/auth/login", data).then((res) => res.data);
};

const RegisterUser = (data: RegisterInput): Promise<AuthResponse> => {
  return Api.post("/auth/register", data).then((res) => res.data);
};

const authConfig = {
  userFn: (): Promise<User> => {
    return Api.get("/auth/me").then((res) => res.data.user);
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

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const user = useUser();
  const location = useLocation();
  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace={true}
      />
    );
  }

  return children;
};
