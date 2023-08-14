import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Typography } from "antd";
import Image from "next/image";
import { get } from "lodash";

import { loginWithGoogle } from "@/apis/user";
import GoogleLogo from "public/images/google-logo.png";

export interface GoogleButtonProps {
  type: "login" | "signUp";
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
}

const GoogleButton = ({ type, onSuccess, onError }: GoogleButtonProps) => {
  const { mutate: mutateLoginWithGoogle } = useMutation(loginWithGoogle, {
    onSuccess,
    onError: (err: Error) => {
      const errorMessage = get(err, "response.data.message") || "";
      onError(errorMessage);
    },
  });

  const renderTypeTitle = useCallback(() => {
    switch (type) {
      case "login":
        return "login";
      case "signUp":
      default:
        return "sign up";
    }
  }, [type]);

  return (
    <>
      <Typography.Text className="text-gray-400 mt-6">
        or {renderTypeTitle()} with
      </Typography.Text>
      <div
        className="rounded-full mt-2 border p-2 shadow-md cursor-pointer"
        onClick={() => mutateLoginWithGoogle()}
      >
        <Image src={GoogleLogo} alt="google logo" className="w-4 h-4" />
      </div>
    </>
  );
};

export default GoogleButton;
