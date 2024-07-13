import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_BASE_URL } from "@/config";
import { SampleResponseBody } from "@/features/sample/api";
import {useGetUserAuthMe} from "@/auto-generated/sandboxComponents"

const Users = () => {
  const { error } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get(`${API_BASE_URL}all_user`).then((res) => res.data),
  });
  if (error) return "An error has occurred: " + error.message;
  return "Users";
};

const ApiCallSample = () => {
  console.log("api call sample.");
  const {data, error, isLoading} = useGetUserAuthMe({});
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
  console.log("debug");
  console.log(data);
  return (
    <>
        <>'Email: ${data?.email}`</>
        <ul>
        {data?.roles?.map((role) => <li key={role}>{role}</li>)}
        </ul>
    </>
  )
}
export const Sample = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["sampleData"],
    queryFn: (): Promise<SampleResponseBody> =>
      axios.get(`${API_BASE_URL}sample`).then((res) => res.data),
  });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {/* <>{`Sample foo: ${data ? data.foo : "undefined"} bar: ${data ? data.hoge : "undefined"}`}</>
      <div>{isFetching ? "Updating..." : ""}</div> */}
      <Users />
      <ApiCallSample/>
    </>
  );
};
