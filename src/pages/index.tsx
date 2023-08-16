import { useEffect } from "react";

import { isLoggedIn } from "@/utils/functions";
import { useSafePush } from "@/utils/hooks";

const Home = () => {
  const loggedIn = isLoggedIn();
  const { safePush } = useSafePush();

  useEffect(() => {
    if (loggedIn) {
      safePush("/dashboard");
    } else {
      safePush("/login");
    }
  }, [safePush, loggedIn]);

  return null;
};

export default Home;
