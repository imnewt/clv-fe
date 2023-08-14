import Axios from "axios";

import { LoginRequest } from "@/models/LoginRequest";
import { USER_SERVICE_HOST } from "@/utils/constants";

export const login = async ({ email, password }: LoginRequest) => {
  const response = await Axios.post(`${USER_SERVICE_HOST}/auth/login`, {
    email,
    password,
  });

  return response.data;
};
