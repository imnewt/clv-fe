import { useCallback } from "react";
import { Typography } from "antd";
import Image from "next/image";

import { loginWithGoogle } from "@/apis/auth";
import GoogleLogo from "public/images/google-logo.png";

export interface GoogleButtonProps {
  type: "login" | "signUp";
}

const GoogleButton = ({ type }: GoogleButtonProps) => {
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
        onClick={loginWithGoogle}
      >
        <Image src={GoogleLogo} alt="google logo" className="w-4 h-4" />
      </div>
    </>
  );
};

export default GoogleButton;
