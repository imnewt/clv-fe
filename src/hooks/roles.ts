import { useQuery } from "@tanstack/react-query";

import { getAllRoles } from "@/apis/roles";
import Role from "@/models/Role";

export const useGetAllRoles = () => {
  const query = useQuery<Role[]>(["get_all_roles"], getAllRoles);
  return { roles: query.data, isLoadingRoles: query.isLoading };
};
