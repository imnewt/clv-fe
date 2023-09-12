import { useEffect } from "react";
import { useRouter } from "next/router";

import { setAuth, setCurrentUser } from "@/utils/functions";

const Home = () => {
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

  return null;
};

Home.isPublic = true;

export default Home;
