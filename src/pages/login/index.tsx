import { useEffect } from "react";
import { useRouter } from "next/router";

import { ClvBackground } from "@/components";
import LoginForm from "./components/LoginForm";
import { isLoggedIn } from "@/utils/functions";

const Login = () => {
  const loggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) router.push("/dashboard");
  }, [loggedIn, router]);

  return (
    <div className="flex bg-white">
      <ClvBackground />
      <LoginForm />
    </div>
  );
};

Login.isPublic = true;

export default Login;
