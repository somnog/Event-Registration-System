"use client";

import { Layout, Menu, Button, Space, Avatar, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Sider, Content, Header } = Layout;
const { Text } = Typography;

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Dummy user data (replace with real auth state)
  const user = {
    name: "Admin User",
  };

  const menuItems = [
    { key: "/organizer/dashboard", label: "Dashboard" },
    { key: "/organizer/create-event", label: "Create Event" },
    { key: "/organizer/events", label: "Events List" },
    { key: "/organizer/attendees", label: "Attendees" },
  ];

  const handleLogout = () => {
    // Replace with real logout logic
    alert("Logged out!");
    router.push("/login"); 
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div style={{ color: "#fff", padding: "16px", fontSize: 18 }}>
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          onClick={({ key }) => router.push(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Space size="middle">
            <Avatar icon={<UserOutlined />} />
            <Text>{user.name}</Text>
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Space>
        </Header>
        <Content style={{ padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
