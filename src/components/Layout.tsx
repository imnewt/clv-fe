import React, { useEffect, useState } from "react";
import { Layout as AntLayout, Menu, theme } from "antd";
import { UserOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";

import Logo from "public/images/logo.png";
import TransparentLogo from "public/images/logo-transparent.png";
import { brandColor } from "@/utils/constants";
import Link from "next/link";

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  Component: React.FC;
}

const menu = [
  {
    key: "profile",
    label: "Profile",
    icon: <UserOutlined />,
    path: "/profile",
  },
  {
    key: "dashboard",
    label: "User Management",
    icon: <TeamOutlined />,
    path: "/dashboard",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingOutlined />,
    path: "/profile",
  },
];

const Layout = ({ Component }: LayoutProps) => {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (!mounted) return <></>;
  return (
    <AntLayout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="shadow-md"
        style={{ background: brandColor }}
      >
        <div className="flex justify-center border-b border-b-white mx-4">
          <Image src={Logo} alt="logo" className="w-32 " />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="mt-4"
          style={{ background: "transparent" }}
          defaultSelectedKeys={[router.pathname]}
        >
          {menu.map((menuItem) => (
            <Link key={menuItem.key} href={menuItem.path}>
              <Menu.Item
                // key={menuItem.key}
                icon={menuItem.icon}
                // onClick={() =>
                //   router.push(menuItem.path, undefined, { shallow: true })
                // }
                className="text-white"
              >
                <span>{menuItem.label}</span>
              </Menu.Item>
            </Link>
          ))}
        </Menu>
      </Sider>
      <AntLayout>
        <Header
          className="flex items-center h-24 shadow-md"
          style={{ background: colorBgContainer }}
        >
          <div className="flex justify-center w-full grow">
            <Image src={TransparentLogo} alt="logo" className="w-32" />
          </div>
        </Header>
        <Content
          className="m-6 p-6 shadow-md"
          style={{ background: colorBgContainer }}
        >
          <Component />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
