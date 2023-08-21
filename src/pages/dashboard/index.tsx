import { PrivateRoute, Layout } from "@/components";
import Dashboard from "./Dashboard";

const DashboardPage = () => {
  return (
    <PrivateRoute>
      <Layout Component={Dashboard} />
    </PrivateRoute>
  );
};

export default DashboardPage;
