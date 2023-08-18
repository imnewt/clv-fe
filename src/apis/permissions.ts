import Axios from "axios";

import { Filter } from "@/models/Filter";
import { USER_SERVICE_HOST } from "@/utils/constants";
import { requestParamsFromObject } from "@/utils/functions";

export const getAllPermissions = async (filter: Filter) => {
  const response = await Axios.get(
    `${USER_SERVICE_HOST}/permissions${requestParamsFromObject({ ...filter })}`
  );
  return response.data;
};
