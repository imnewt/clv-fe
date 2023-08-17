import { Layout, PrivateRoute } from "@/components";
import UserManagement from "./UserManagement";

const UserManagementPage = () => {
  return (
    <PrivateRoute>
      <Layout Component={UserManagement} />
    </PrivateRoute>
  );
};

export default UserManagementPage;
