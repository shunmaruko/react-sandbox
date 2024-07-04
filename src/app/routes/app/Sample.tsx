import { useState } from "react";

import { Authorization } from "@/lib/authorization";
import { useSearchUsers } from "@/auto-generated/sandboxComponents";

export const ProtectedSample = () => {
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchUsers(
    {
      queryParams: { q: query },
    },
    {
      enabled: Boolean(query),
    },
  );
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
        <div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
          {isLoading ? (
            <div>Loading…</div>
          ) : (
            <ul>
              {data?.items.map((item) => <li key={item.id}>{item.login}</li>)}
            </ul>
          )}
        </div>
        <>Only admin user can access to this is sample.</>
      </>
    </Authorization>
  );
};
