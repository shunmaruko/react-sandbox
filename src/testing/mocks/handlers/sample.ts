import { HttpResponse, http, delay, PathParams } from "msw";

import { API_BASE_URL } from "@/config";
import { db } from "@/testing/mocks/db";

//<PathParams<never>, undefined, ResponseBody>
export const SampleHandlers = [
  http.get(`${API_BASE_URL}sample`, async () => {
    console.log("called sample get");
    return HttpResponse.json({ hoge: "Hoge", foo: "Foo" });
  }),
  http.get(`${API_BASE_URL}all_user`, async () => {
    console.log("called all user");
    const allUsers = db.user.getAll();
    return HttpResponse.json({ user: allUsers[0] });
  }),
];
