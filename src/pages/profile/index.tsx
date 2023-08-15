import { PrivateRoute, Layout } from "@/components";
import Profile from "./Profile";

const ProfilePage = () => {
  return (
    <PrivateRoute>
      <Layout Component={Profile} />
    </PrivateRoute>
  );
};

export default ProfilePage;
