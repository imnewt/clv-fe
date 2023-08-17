import { Layout, PrivateRoute } from "@/components";
import RoleManagement from "./RoleManagement";

const RoleManagementPage = () => {
  return (
    <PrivateRoute>
      <Layout Component={RoleManagement} />
    </PrivateRoute>
  );
};

export default RoleManagementPage;
