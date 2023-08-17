import { useEffect } from "react";
import { useRouter } from "next/router";

import { setAuth } from "@/utils/functions";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    const { accessToken, refreshToken } = query;
    if (accessToken && refreshToken) {
      setAuth({
        accessToken: accessToken as string,
        refreshToken: refreshToken as string,
      });
      router.replace({
        pathname: "/users",
        query: {},
      });
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
};

export default Home;
