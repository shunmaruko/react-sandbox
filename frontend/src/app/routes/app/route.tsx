import { Outlet } from "react-router-dom";

import { useUser, useLogout } from "@/lib/auth";

export const AppRoot = () => {
  const user = useUser();
  const logout = useLogout();
  if (user.isLoading) {
    return <div>Loading ...</div>;
  }
  if (user.error) {
    return <div>{JSON.stringify(user.error, null, 2)}</div>;
  }
  if (!user.data) {
    return <div>Not logged in</div>;
  }
  return (
    <>
      <>{`Hello ${user.data.firstName}!`}</>
      <br />
      <button
        onClick={() => {
          alert("Log out");
          logout.mutate({});
        }}
      >
        Log out
      </button>
      <br />
      <Outlet />
    </>
  );
};
