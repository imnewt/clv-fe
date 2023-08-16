import Axios from "axios";

import { USER_SERVICE_HOST } from "@/utils/constants";

export const getAllUsers = async () => {
  const response = await Axios.get(`${USER_SERVICE_HOST}/users`);
  return response.data;
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  const response = await Axios.delete(`${USER_SERVICE_HOST}/users/${userId}`);
  return response.data;
};
