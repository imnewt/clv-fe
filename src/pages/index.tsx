import { useEffect } from "react";
import { useRouter } from "next/router";

import { isLoggedIn, setAuth, setCurrentUser } from "@/utils/functions";

const Home = () => {
  const loggedIn = isLoggedIn();
  const router = useRouter();

  // Handle login with Google
  useEffect(() => {
    const { query } = router;
    const { accessToken, refreshToken, userId } = query;
    if (accessToken && refreshToken && userId) {
      setAuth({
        accessToken: accessToken as string,
        refreshToken: refreshToken as string,
      });
      setCurrentUser({ id: userId as string, permissions: [] });
      router.replace({
        pathname: "/dashboard",
        query: {},
      });
    }
  }, [router]);

  useEffect(() => {
    if (!loggedIn) router.push("/login");
    else router.push("/dashboard");
  }, [loggedIn, router]);

  return null;
};

export default Home;
