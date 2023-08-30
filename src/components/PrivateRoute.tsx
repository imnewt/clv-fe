import React, { useEffect } from "react";

import { isLoggedIn } from "@/utils/functions";
import { useSafePush } from "@/utils/hooks";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: any = ({ children }: PrivateRouteProps) => {
  const loggedIn = isLoggedIn();
  const { safePush } = useSafePush();

  useEffect(() => {
    if (!loggedIn) safePush("/login");
  }, [loggedIn, safePush]);

  return loggedIn ? children : null;
};

export default PrivateRoute;
