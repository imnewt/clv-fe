import Image from "next/image";

import { LoginForm } from "./components";
import { brandColor } from "@/utils/constants";
import Logo from "public/images/logo.png";

const Login = () => {
  return (
    <div className="flex bg-white">
      <div
        className="flex justify-center items-center"
        style={{ flexGrow: 1, background: brandColor }}
      >
        <Image
          src={Logo}
          alt="logo"
          style={{ width: "25rem", height: "25rem" }}
        />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
