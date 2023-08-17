import { Layout, PrivateRoute } from "@/components";
import Settings from "./Settings";

const SettingsPage = () => {
  return (
    <PrivateRoute>
      <Layout Component={Settings} />
    </PrivateRoute>
  );
};

export default SettingsPage;
