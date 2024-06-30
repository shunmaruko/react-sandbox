import { Authorization } from "@/lib/authorization";

export const ProtectedSample = () => {
  return (
    <Authorization allowedRoles={["ADMIN"]}>
      <>Only admin user can access to this is sample.</>
    </Authorization>
  );
};
