import Axios from "axios";

import { USER_SERVICE_HOST } from "@/utils/constants";
import { requestParamsFromObject } from "@/utils/functions";

export const getAllPermissions = async ({
  searchTerm = "",
}: {
  searchTerm: string;
}) => {
  const response = await Axios.get(
    `${USER_SERVICE_HOST}/permissions${requestParamsFromObject({
      search: searchTerm,
    })}`
  );
  return response.data;
};
