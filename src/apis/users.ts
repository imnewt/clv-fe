import Axios from "axios";

import User, { NewUser } from "@/models/User";
import { Filter } from "@/models/Filter";
import { API_GATEWAY_URL } from "@/utils/constants";
import { requestParamsFromObject } from "@/utils/functions";

export const getAllUsers = async (filter: Filter) => {
  const response = await Axios.get(
    `${API_GATEWAY_URL}/users${requestParamsFromObject({
      ...filter,
    })}`
  );
  return response.data;
};

export const getUserDetail = async (userId: string) => {
  const response = await Axios.get(`${API_GATEWAY_URL}/users/${userId}`);
  return response.data;
};

export const createUser = async (user: NewUser) => {
  const response = await Axios.post(`${API_GATEWAY_URL}/users/create`, {
    ...user,
  });
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await Axios.patch(`${API_GATEWAY_URL}/users/${user.id}`, {
    ...user,
  });
  return response.data;
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  const response = await Axios.delete(`${API_GATEWAY_URL}/users/${userId}`);
  return response.data;
};
