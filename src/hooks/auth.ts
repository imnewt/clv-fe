import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { get } from "lodash";

import { useShowError } from "@/utils/hooks";
import {
  sendResetPasswordRequest,
  resetPassword,
  register,
  login,
} from "@/apis/auth";
import { setAuth, setCurrentUser } from "@/utils/functions";
import { useRouter } from "next/router";

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter();
  const { showError } = useShowError();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      message.success("Login successfully!");
      const { accessToken, refreshToken, userId } = data;
      setAuth({ accessToken, refreshToken });
      setCurrentUser(userId);
      router.push("/dashboard");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = get(error, "response.data.message") || "";
      showError("Login failed!", errorMessage);
    },
  });

  return {
    login: mutate,
    isLoggingin: isLoading,
  };
};

export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter();
  const { showError } = useShowError();

  const { mutate, isLoading } = useMutation(register, {
    onSuccess: () => {
      message.success(
        "Sign Up successfully! Please log in to start using our application."
      );
      router.push("/login");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = get(error, "response.data.message") || "";
      showError("Register failed!", errorMessage);
    },
  });

  return {
    register: mutate,
    isRegistering: isLoading,
  };
};

export const useSendResetPasswordRequest = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const { showError } = useShowError();

  const { mutate, isLoading } = useMutation(sendResetPasswordRequest, {
    onSuccess: () => {
      message.success(
        "Send reset password request successfully! Please check your mail!"
      );
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = get(error, "response.data.message") || "";
      showError("Send reset password request failed!", errorMessage);
    },
  });

  return {
    sendResetPasswordRequest: mutate,
    isSendingResetPasswordRequest: isLoading,
  };
};

export const useResetPassword = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { showError } = useShowError();

  const { mutate, isLoading } = useMutation(resetPassword, {
    onSuccess: () => {
      message.success("Reset password successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage = get(error, "response.data.message") || "";
      showError("Reset password failed!", errorMessage);
    },
  });

  return {
    resetPassword: mutate,
    isResetingPassword: isLoading,
  };
};
