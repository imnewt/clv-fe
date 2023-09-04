import { useQuery } from "@tanstack/react-query";

import Permission from "@/models/Permission";
import { Filter } from "@/models/Filter";
import { getAllPermissions, getUserPermissions } from "@/apis/permissions";
import { DEFAULT_FILTER } from "@/utils/constants";

export const useGetAllPermissions = (filter: Filter = DEFAULT_FILTER) => {
  const { data, isLoading } = useQuery<{
    permissions: Permission[];
    total: number;
  }>(["get_all_permissions", filter], () => getAllPermissions(filter));
  return {
    permissions: data?.permissions,
    total: data?.total,
    isLoadingPermissions: isLoading,
  };
};

export const useGetUserPermissions = (userId: string) => {
  const { data, isLoading } = useQuery<Permission[]>(
    ["get_user_permissions", userId],
    () => getUserPermissions(userId),
    {
      enabled: !!userId,
    }
  );
  const permissionIds = data?.map((permission) => permission.id);
  return {
    userPermissions: permissionIds,
    isLoading,
  };
};
