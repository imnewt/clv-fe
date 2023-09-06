import { useEffect } from "react";
import { useRouter } from "next/router";

import { ClvBackground } from "@/components";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { isLoggedIn } from "@/utils/functions";

const ResetPassword = () => {
  const loggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) router.push("/dashboard");
  }, [loggedIn, router]);

  return (
    <div className="flex bg-white">
      <ClvBackground />
      <ResetPasswordForm />
    </div>
  );
};

ResetPassword.isPublic = true;

export default ResetPassword;
