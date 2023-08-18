import Axios from "axios";

import { USER_SERVICE_HOST } from "@/utils/constants";
import Role, { NewRole } from "@/models/Role";
import { requestParamsFromObject } from "@/utils/functions";

export const getAllRoles = async ({
  searchTerm = "",
}: {
  searchTerm: string;
}) => {
  const response = await Axios.get(
    `${USER_SERVICE_HOST}/roles${requestParamsFromObject({
      search: searchTerm,
    })}`
  );
  return response.data;
};

export const getRoleDetail = async (roleId: string) => {
  const response = await Axios.get(`${USER_SERVICE_HOST}/roles/${roleId}`);
  return response.data;
};

export const createRole = async (role: NewRole) => {
  const response = await Axios.post(`${USER_SERVICE_HOST}/roles/create`, {
    ...role,
  });
  return response.data;
};

export const updateRole = async (role: Role) => {
  const response = await Axios.patch(`${USER_SERVICE_HOST}/roles/${role.id}`, {
    ...role,
  });
  return response.data;
};

export const deleteRole = async ({ roleId }: { roleId: string }) => {
  const response = await Axios.delete(`${USER_SERVICE_HOST}/roles/${roleId}`);
  return response.data;
};
