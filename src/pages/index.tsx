import { useRouter } from "next/router";

import { isLoggedIn, isServer } from "@/utils/functions";

const Home = () => {
  const loggedIn = isLoggedIn();
  const router = useRouter();

  if (isServer) {
    return null;
  }

  if (loggedIn) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }

  return null;
};

export default Home;
