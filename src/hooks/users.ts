import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { get } from "lodash";

import User from "@/models/User";
import { Filter } from "@/models/Filter";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserDetail,
  updateUser,
} from "@/apis/users";
import { useShowError } from "@/utils/hooks";
import { DEFAULT_FILTER } from "@/utils/constants";

export const useGetAllUsers = (filter: Filter = DEFAULT_FILTER) => {
  const query = useQuery<{ users: User[]; total: number }>(
    ["get_all_users", filter],
    () => getAllUsers(filter)
  );
  return {
    users: query.data?.users,
    total: query.data?.total,
    isLoadingUsers: query.isLoading,
  };
};

export const useGetUserDetail = ({
  userId,
  enabled = true,
}: {
  userId: string;
  enabled?: boolean;
}): { user: User; isLoadingUserDetail: boolean } => {
  const query = useQuery(
    ["get_user_detail", userId],
    () => getUserDetail(userId),
    {
      enabled,
    }
  );
  return { user: query.data, isLoadingUserDetail: query.isLoading };
};

export const useCreateUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: () => {
      message.success("Create User Successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessages = get(error, "response.data") || [];
      showError("Create User Failed!", errorMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_users"] });
    },
  });

  return { createUser: mutate, isCreatingUser: isLoading };
};

export const useUpdateUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateUser, {
    onSuccess: () => {
      message.success("Update User Successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessages = get(error, "response.data") || [];
      showError("Update User Failed!", errorMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_users"] });
    },
  });

  return { updateUser: mutate, isUpdatingUser: isLoading };
};

export const useDeleteUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteUser, {
    onSuccess: () => {
      message.success("Delete User Successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessages = get(error, "response.data") || [];
      showError("Delete User Failed!", errorMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_users"] });
    },
  });

  return { deleteUser: mutate, isDeletingUser: isLoading };
};
