import { Role } from "@/lib/auth.type";
import { useUser } from "@/lib/auth";

const UnauthorizedFallback = () => {
  return <>Oops! You don't have access to thie page.</>;
};

type AuthorizationProps = {
  allowedRoles: Role[];
  children: React.ReactNode;
};

export const Authorization = ({
  allowedRoles,
  children,
}: AuthorizationProps) => {
  const user = useUser();
  if (!user.data) {
    throw Error("User does not exist!");
  }
  const isAuthorized = allowedRoles.includes(user.data.role) ? true : false;
  return <>{isAuthorized ? children : <UnauthorizedFallback />}</>;
};
