import Axios from "axios";

import User, { NewUser } from "@/models/User";
import { USER_SERVICE_HOST } from "@/utils/constants";
import { requestParamsFromObject } from "@/utils/functions";

export const getAllUsers = async ({
  searchTerm = "",
}: {
  searchTerm: string;
}) => {
  const response = await Axios.get(
    `${USER_SERVICE_HOST}/users${requestParamsFromObject({
      search: searchTerm,
    })}`
  );
  return response.data;
};

export const getUserDetail = async (userId: string) => {
  const response = await Axios.get(`${USER_SERVICE_HOST}/users/${userId}`);
  return response.data;
};

export const createUser = async (user: NewUser) => {
  const response = await Axios.post(`${USER_SERVICE_HOST}/users/create`, {
    ...user,
  });
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await Axios.patch(`${USER_SERVICE_HOST}/users/${user.id}`, {
    ...user,
  });
  return response.data;
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  const response = await Axios.delete(`${USER_SERVICE_HOST}/users/${userId}`);
  return response.data;
};
