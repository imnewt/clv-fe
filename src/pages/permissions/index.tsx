import { PrivateRoute, Layout } from "@/components";
import Permission from "./Permission";

const PermissionPage = () => {
  return (
    <PrivateRoute>
      <Layout Component={Permission} />
    </PrivateRoute>
  );
};

export default PermissionPage;
