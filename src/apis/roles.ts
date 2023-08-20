import Axios from "axios";

import Role, { NewRole } from "@/models/Role";
import { Filter } from "@/models/Filter";
import { requestParamsFromObject } from "@/utils/functions";
import { API_GATEWAY_URL } from "@/utils/constants";

export const getAllRoles = async (filter: Filter) => {
  const response = await Axios.get(
    `${API_GATEWAY_URL}/roles${requestParamsFromObject({ ...filter })}`
  );
  return response.data;
};

export const getRoleDetail = async (roleId: string) => {
  const response = await Axios.get(`${API_GATEWAY_URL}/roles/${roleId}`);
  return response.data;
};

export const createRole = async (role: NewRole) => {
  const response = await Axios.post(`${API_GATEWAY_URL}/roles/create`, {
    ...role,
  });
  return response.data;
};

export const updateRole = async (role: Role) => {
  const response = await Axios.patch(`${API_GATEWAY_URL}/roles/${role.id}`, {
    ...role,
  });
  return response.data;
};

export const deleteRole = async ({ roleId }: { roleId: string }) => {
  const response = await Axios.delete(`${API_GATEWAY_URL}/roles/${roleId}`);
  return response.data;
};
