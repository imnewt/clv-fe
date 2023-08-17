import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { get } from "lodash";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserDetail,
  updateUser,
} from "@/apis/users";
import User from "@/models/User";
import { useShowError } from "@/utils/hooks";

export const useGetAllUsers = () => {
  const query = useQuery<User[]>(["get_all_users"], getAllUsers);
  return { users: query.data, isLoadingUsers: query.isLoading };
};

export const useGetUserDetail = (
  userId: string
): { user: User; isLoadingUserDetail: boolean } => {
  const query = useQuery(["get_user_detail", userId], () =>
    getUserDetail(userId)
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
      const errorMessage = get(error, "response.data.message") || "";
      showError("Create User Failed!", errorMessage);
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
      const errorMessage = get(error, "response.data.message") || "";
      showError("Update User Failed!", errorMessage);
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
      const errorMessage = get(error, "response.data.message") || "";
      showError("Delete User Failed!", errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_users"] });
    },
  });

  return { deleteUser: mutate, isDeletingUser: isLoading };
};
