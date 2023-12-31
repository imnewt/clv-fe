import Axios from "axios";

import { Filter } from "@/models/Filter";
import { API_GATEWAY_URL } from "@/utils/constants";
import { requestParamsFromObject } from "@/utils/functions";

export const getAllPermissions = async (filter: Filter) => {
  const response = await Axios.get(
    `${API_GATEWAY_URL}/user-service/permissions${requestParamsFromObject({
      ...filter,
    })}`
  );
  return response.data;
};

export const getUserPermissions = async (userId: string) => {
  const response = await Axios.get(
    `${API_GATEWAY_URL}/user-service/users/${userId}/permissions`
  );
  return response.data;
};
