import Axios from "axios";

import { API_BASE_URL } from "@/config";

export const Api = Axios.create({
  baseURL: API_BASE_URL,
});
