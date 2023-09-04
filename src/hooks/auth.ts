import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { get } from "lodash";
import { useRouter } from "next/router";

import { useShowError } from "@/utils/hooks";
import { setAuth, setCurrentUser } from "@/utils/functions";
import {
  sendResetPasswordRequest,
  resetPassword,
  register,
  login,
} from "@/apis/auth";

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter();
  const { showError } = useShowError();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      message.success("Login successfully!");
      const { accessToken, refreshToken, userId } = data;
      setAuth({ accessToken, refreshToken });
      setCurrentUser({
        id: userId,
        permissions: [],
      });
      router.push("/dashboard");
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessages = get(error, "response.data") || [];
      showError("Login failed!", errorMessages);
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
      const errorMessages = get(error, "response.data") || [];
      showError("Register failed!", errorMessages);
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
      const errorMessages = get(error, "response.data") || [];
      showError("Send reset password request failed!", errorMessages);
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
      const errorMessages = get(error, "response.data") || [];
      showError("Reset password failed!", errorMessages);
    },
  });

  return {
    resetPassword: mutate,
    isResetingPassword: isLoading,
  };
};
