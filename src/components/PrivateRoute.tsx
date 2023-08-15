import React from "react";
import { useRouter } from "next/router";

import { isLoggedIn, isServer } from "@/utils/functions";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: any = ({ children }: PrivateRouteProps) => {
  const loggedIn = isLoggedIn();
  const router = useRouter();

  if (isServer) {
    return <div></div>;
  }

  if (loggedIn) return children;
  else {
    router.push("/login");
  }

  return <div></div>;
};

export default PrivateRoute;
