import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { SampleResponseBody } from "@/features/sample/api";
import { API_BASE_URL } from "@/config";

const Users = () => {
  const { error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get(`${API_BASE_URL}all_user`).then((res) => res.data),
  });
  if (error) return "An error has occurred: " + error.message;
  console.log("users");
  console.log(data);
  return "Users";
};

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
      <>{`Sample foo: ${data ? data.foo : "undefined"} bar: ${data ? data.hoge : "undefined"}`}</>
      <div>{isFetching ? "Updating..." : ""}</div>
      <Users />
    </>
  );
};
