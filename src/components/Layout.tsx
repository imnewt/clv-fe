import React, { useEffect, useState, useMemo } from "react";
import { Layout, Menu, theme } from "antd";
import {
  SettingOutlined,
  TeamOutlined,
  ClusterOutlined,
  BranchesOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import Logo from "public/images/logo.png";
import TransparentLogo from "public/images/logo-transparent.png";
import { brandColor } from "@/utils/constants";
import { logout } from "@/utils/functions";

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  Component: React.FC;
}

const menu = [
  {
    key: "users",
    label: "User Management",
    icon: <TeamOutlined />,
    path: "/users",
  },
  {
    key: "roles",
    label: "Role Management",
    icon: <ClusterOutlined />,
    path: "/roles",
  },
  {
    key: "permissions",
    label: "Permission Management",
    icon: <BranchesOutlined />,
    path: "/permissions",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingOutlined />,
    path: "/settings",
  },
];

const MainLayout = ({ Component }: LayoutProps) => {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedMenu = useMemo(() => {
    return router.pathname.split("/")[1];
  }, [router]);

  if (!mounted) return <></>;
  return (
    <Layout className="min-h-screen" hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="shadow-md"
        style={{ background: brandColor }}
        width="15rem"
      >
        <div className="flex justify-center border-b border-b-white mx-4">
          <Image src={Logo} alt="logo" className="w-32 " />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="mt-4"
          style={{ background: "transparent" }}
          defaultSelectedKeys={[selectedMenu]}
        >
          {menu.map((menuItem) => (
            <Menu.Item
              key={menuItem.key}
              icon={menuItem.icon}
              className="text-white"
            >
              <Link href={menuItem.path}>{menuItem.label}</Link>
            </Menu.Item>
          ))}
          <Menu.ItemGroup>
            <Menu.Item
              key="/logout"
              icon={<LogoutOutlined />}
              className="text-white"
              onClick={logout}
            >
              Logout
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout>
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
      </Layout>
    </Layout>
  );
};

export default MainLayout;
