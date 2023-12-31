import Axios from "axios";

import LoginRequest from "@/models/LoginRequest";
import RegisterRequest from "@/models/RegisterRequest";
import { API_GATEWAY_URL, API_BASE_URL } from "@/utils/constants";

export const login = async ({ email, password }: LoginRequest) => {
  const response = await Axios.post(
    `${API_GATEWAY_URL}/user-service/auth/login`,
    {
      email,
      password,
    }
  );
  return response.data;
};

export const loginWithGoogle = async () => {
  window.location.href = `${API_BASE_URL}/auth/login/google`;
};

export const register = async ({
  email,
  userName,
  password,
}: RegisterRequest) => {
  const response = await Axios.post(
    `${API_GATEWAY_URL}/user-service/auth/register`,
    {
      email,
      userName,
      password,
    }
  );
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await Axios.post(
    `${API_GATEWAY_URL}/user-service/auth/refresh-token`,
    {
      refreshToken,
    }
  );
  return response.data;
};

export const sendResetPasswordRequest = async (email: string) => {
  const response = await Axios.post(
    `${API_GATEWAY_URL}/user-service/auth/forgot-password`,
    {
      email,
    }
  );
  return response.data;
};

export const resetPassword = async ({
  resetToken,
  newPassword,
}: {
  resetToken: string;
  newPassword: string;
}) => {
  const response = await Axios.post(
    `${API_GATEWAY_URL}/user-service/auth/reset-password`,
    {
      resetToken,
      newPassword,
    }
  );
  return response.data;
};
