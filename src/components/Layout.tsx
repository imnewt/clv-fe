import React, { useEffect, useState, useMemo } from "react";
import { Layout, Menu, theme } from "antd";
import {
  SettingOutlined,
  TeamOutlined,
  ClusterOutlined,
  BranchesOutlined,
  LogoutOutlined,
  DashboardOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import Logo from "public/images/logo.png";
import TransparentLogo from "public/images/logo-transparent.png";
import { brandColor, PERMISSION } from "@/utils/constants";
import { getCurrentUser, logout } from "@/utils/functions";
import { useGetUserPermissions } from "@/hooks/permissions";

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  Component: React.FC;
}

const MainLayout = ({ Component }: LayoutProps) => {
  const router = useRouter();
  const currentUserId = getCurrentUser();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const { userPermissions = [] } = useGetUserPermissions(currentUserId);

  const showVesselManagement = useMemo(
    () => userPermissions.includes(PERMISSION.READ_VESSEL),
    [userPermissions]
  );
  const showUserManagement = useMemo(
    () => userPermissions.includes(PERMISSION.READ_USER),
    [userPermissions]
  );
  const showRoleManagement = useMemo(
    () => userPermissions.includes(PERMISSION.READ_ROLE),
    [userPermissions]
  );
  const showPermissionManagement = useMemo(
    () => userPermissions.includes(PERMISSION.READ_PERMISSION),
    [userPermissions]
  );

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
          <Menu.Item
            key="dashboard"
            icon={<DashboardOutlined />}
            className="text-white"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>
          {showVesselManagement && (
            <Menu.Item
              key="vessels"
              icon={<GlobalOutlined />}
              className="text-white"
            >
              <Link href="/vessels">Vessel Management</Link>
            </Menu.Item>
          )}
          {showUserManagement && (
            <Menu.Item
              key="users"
              icon={<TeamOutlined />}
              className="text-white"
            >
              <Link href="/users">User Management</Link>
            </Menu.Item>
          )}
          {showRoleManagement && (
            <Menu.Item
              key="roles"
              icon={<ClusterOutlined />}
              className="text-white"
            >
              <Link href="/roles">Role Management</Link>
            </Menu.Item>
          )}
          {showPermissionManagement && (
            <Menu.Item
              key="permissions"
              icon={<BranchesOutlined />}
              className="text-white"
            >
              <Link href="/permissions">Permission Management</Link>
            </Menu.Item>
          )}
          <Menu.Item
            key="settings"
            icon={<SettingOutlined />}
            className="text-white"
          >
            <Link href="/settings">Settings</Link>
          </Menu.Item>
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
