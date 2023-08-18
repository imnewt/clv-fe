import { PrivateRoute, Layout } from "@/components";
import PermissionManagement from "./PermissionManagement";

const PermissionPage = () => {
  return (
    <PrivateRoute>
      <Layout Component={PermissionManagement} />
    </PrivateRoute>
  );
};

export default PermissionPage;
