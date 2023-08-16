import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteUser, getAllUsers } from "@/apis/users";

// const optionType = Omit<
//   UseMutationOptions<
//     any,
//     unknown,
//     {
//       userId: string;
//     },
//     unknown
//   >,
//   "mutationFn"
// >;

export const useGetAllUsers = () => {
  const query = useQuery(["get_all_users"], getAllUsers);
  return { data: query.data, isLoading: query.isLoading };
};

export const useDeleteUser = ({
  options,
}: {
  options: Omit<
    UseMutationOptions<
      any,
      unknown,
      {
        userId: string;
      },
      unknown
    >,
    "mutationFn"
  >;
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteUser, {
    ...options,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_users"] });
    },
  });

  return { deleteUser: mutate, isLoading };
};
