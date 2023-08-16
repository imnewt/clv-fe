import { useRouter } from "next/router";
import { useEffect } from "react";

import { setAccessToken } from "@/utils/functions";
import UserManagement from "../users/UserManagement";

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

  return <UserManagement />;
};

export default Dashboard;
