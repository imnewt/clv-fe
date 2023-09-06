import { useEffect } from "react";
import { useRouter } from "next/router";

import { ClvBackground } from "@/components";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { isLoggedIn } from "@/utils/functions";

const ForgotPassword = () => {
  const loggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) router.push("/dashboard");
  }, [loggedIn, router]);

  return (
    <div className="flex bg-white">
      <ClvBackground />
      <ForgotPasswordForm />
    </div>
  );
};

ForgotPassword.isPublic = true;

export default ForgotPassword;
