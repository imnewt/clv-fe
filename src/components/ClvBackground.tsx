import Image from "next/image";

import { brandColor } from "@/utils/constants";
import Logo from "public/images/logo.png";

const ClvBackground = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ flexGrow: 1, background: brandColor }}
    >
      <Image
        src={Logo}
        alt="logo"
        style={{ width: "25rem", height: "25rem" }}
      />
    </div>
  );
};

export default ClvBackground;
