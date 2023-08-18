import { useQuery } from "@tanstack/react-query";

import Permission from "@/models/Permission";
import { Filter } from "@/models/Filter";
import { getAllPermissions } from "@/apis/permissions";
import { DEFAULT_FILTER } from "@/utils/constants";

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
