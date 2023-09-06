import { useEffect } from "react";
import { useRouter } from "next/router";

import { ClvBackground } from "@/components";
import SignUpForm from "./components/SignUpForm";
import { isLoggedIn } from "@/utils/functions";

const Register = () => {
  const loggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) router.push("/dashboard");
  }, [loggedIn, router]);

  return (
    <div className="flex bg-white">
      <ClvBackground />
      <SignUpForm />
    </div>
  );
};

Register.isPublic = true;

export default Register;
