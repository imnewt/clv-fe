import { Layout, PrivateRoute } from "@/components";
import VesselManagement from "./VesselManagement";

const VesselManagementPage = () => {
  return (
    <PrivateRoute>
      <Layout Component={VesselManagement} />
    </PrivateRoute>
  );
};

export default VesselManagementPage;
