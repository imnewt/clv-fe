import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";

import Permission from "@/models/Permission";
import { Filter } from "@/models/Filter";
import { getAllPermissions, getUserPermissions } from "@/apis/permissions";
import { DEFAULT_FILTER } from "@/utils/constants";
import { useShowError } from "@/utils/hooks";

export const useGetAllPermissions = (filter: Filter = DEFAULT_FILTER) => {
  const query = useQuery<{ permissions: Permission[]; total: number }>(
    ["get_all_permissions", filter],
    () => getAllPermissions(filter)
  );
  return {
    permissions: query.data?.permissions,
    total: query.data?.total,
    isLoadingPermissions: query.isLoading,
  };
};

export const useGetUserPermissions = (userId: string) => {
  const { showError } = useShowError();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<Permission[]>(["get_user_permissions", userId], () =>
    getUserPermissions(userId)
  );

  if (isError) {
    const errorMessage = get(error, "response.data.message") || "";
    showError("Error while fetching user permissions", errorMessage);
  }

  const permissionIds = data.map((permission) => permission.id);
  return {
    userPermissions: permissionIds,
    isLoadingUserPermissions: isLoading,
  };
};
