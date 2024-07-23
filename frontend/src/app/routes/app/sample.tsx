import { useState } from "react";

import { Authorization } from "@/lib/authorization";
//import { useSearchUsers } from "@/auto-generated/sandboxComponents";
import {useMe} from "@/auto-generated/sandboxComponents"

export const ProtectedSample = () => {
  //const [query, setQuery] = useState("");
  const {data, error, isLoading} = useMe({});

  // const { data, error, isLoading } = useSearchUsers(
  //   {
  //     queryParams: { q: query },
  //   },
  //   {
  //     enabled: Boolean(query),
  //   },
  // );
  if (isLoading){
    return (
      <div>Loading…</div>
    )
  }
  if (error) {
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
  return (
    <Authorization allowedRoles={["ADMIN"]}>
      <>
        <>You can search github user account by the following form.</>
        <>'Email: ${data?.email}`</>
        <ul>
        {data?.roles?.map((role) => <li key={role}>{role}</li>)}
        </ul>
        <>Only admin user can access to this is sample.</>
      </>
    </Authorization>
  );
};
