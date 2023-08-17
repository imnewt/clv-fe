import Axios from "axios";

import { USER_SERVICE_HOST } from "@/utils/constants";

export const getAllRoles = async () => {
  const response = await Axios.get(`${USER_SERVICE_HOST}/roles`);
  return response.data;
};
