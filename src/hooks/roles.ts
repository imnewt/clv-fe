import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { get } from "lodash";

import Role from "@/models/Role";
import { Filter } from "@/models/Filter";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleDetail,
  updateRole,
} from "@/apis/roles";
import { useShowError } from "@/utils/hooks";
import { DEFAULT_FILTER } from "@/utils/constants";

export const useGetAllRoles = (filter: Filter = DEFAULT_FILTER) => {
  const query = useQuery<{ roles: Role[]; total: number }>(
    ["get_all_roles", filter],
    () => getAllRoles(filter)
  );
  return {
    roles: query.data?.roles,
    total: query.data?.total,
    isLoadingRoles: query.isLoading,
  };
};

export const useGetRoleDetail = ({
  roleId,
  enabled,
}: {
  roleId: string;
  enabled: boolean;
}): { role: Role; isLoadingRoleDetail: boolean } => {
  const query = useQuery(
    ["get_role_detail", roleId],
    () => getRoleDetail(roleId),
    {
      enabled,
    }
  );
  return { role: query.data, isLoadingRoleDetail: query.isLoading };
};

export const useCreateRole = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createRole, {
    onSuccess: () => {
      message.success("Create Role Successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = get(error, "response.data.message") || "";
      showError("Create Role Failed!", errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_roles"] });
    },
  });

  return { createRole: mutate, isCreatingRole: isLoading };
};

export const useUpdateRole = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateRole, {
    onSuccess: () => {
      message.success("Update Role Successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = get(error, "response.data.message") || "";
      showError("Update Role Failed!", errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_roles"] });
    },
  });

  return { updateRole: mutate, isUpdatingRole: isLoading };
};

export const useDeleteRole = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteRole, {
    onSuccess: () => {
      message.success("Delete Role Successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = get(error, "response.data.message") || "";
      showError("Delete Role Failed!", errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_roles"] });
    },
  });

  return { deleteRole: mutate, isDeletingRole: isLoading };
};
