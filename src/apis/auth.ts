import Axios from "axios";

import LoginRequest from "@/models/LoginRequest";
import RegisterRequest from "@/models/RegisterRequest";
import { USER_SERVICE_HOST } from "@/utils/constants";

export const login = async ({ email, password }: LoginRequest) => {
  const response = await Axios.post(`${USER_SERVICE_HOST}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const loginWithGoogle = async () => {
  window.location.href = `${USER_SERVICE_HOST}/auth/login/google`;
};

export const register = async ({
  email,
  userName,
  password,
}: RegisterRequest) => {
  const response = await Axios.post(`${USER_SERVICE_HOST}/auth/register`, {
    email,
    userName,
    password,
  });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await Axios.post(`${USER_SERVICE_HOST}/auth/refresh-token`, {
    refreshToken,
  });
  return response.data;
};
