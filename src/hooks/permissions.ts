import { useQuery } from "@tanstack/react-query";

import { getAllPermissions } from "@/apis/permissions";
import Permission from "@/models/Permission";

export const useGetAllPermissions = ({
  searchTerm = "",
}: {
  searchTerm?: string;
}) => {
  const query = useQuery<Permission[]>(
    ["get_all_permissions", searchTerm],
    () => getAllPermissions({ searchTerm })
  );
  return { permissions: query.data, isLoadingPermissions: query.isLoading };
};
