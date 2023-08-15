import { setAccessToken } from "@/utils/functions";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    const { access_token } = query;
    if (access_token) {
      setAccessToken(access_token as string);
      router.replace({
        pathname: router.pathname,
        query: {},
      });
    }
  }, [router]);

  return "dashboard";
};

export default Dashboard;
