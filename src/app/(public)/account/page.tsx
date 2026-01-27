"use client";
import { Avatar, Button, Card, Col, Row, Tabs } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styles from "./style.module.scss";
import { signOut, useSession } from "next-auth/react";

const AccountPage = async () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const { data: session } = useSession();

  const items = [
    {
      key: "1",
      label: "Profile",
      children: (
        <div style={{ padding: "20px 0" }}>
          <h3>Personal Information</h3>
          <p>
            <strong>Name:</strong> {session?.user.name}
          </p>
          <p>
            <strong>Email:</strong> {session?.user.email}
          </p>

          <p>
            <strong>Role:</strong> {session?.user.roles}
          </p>
          <Button
            type="primary"
            style={{ marginTop: 10, backgroundColor: "black" }}
          >
            Edit Profile
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: "My Orders",
      children: (
        <div style={{ padding: "20px 0", textAlign: "center", color: "#888" }}>
          <ShoppingOutlined style={{ fontSize: 40, marginBottom: 10 }} />
          <p>No active orders</p>
          <Button href="/">Start Shopping</Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <Row gutter={[30, 30]}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Avatar
              size={80}
              icon={<UserOutlined />}
              style={{ marginBottom: 15 }}
            />
            <h2>{session?.user.name}</h2>
            <p style={{ color: "gray" }}>Member since 2024</p>
            <Button
              block
              danger
              icon={<LogoutOutlined />}
              style={{ marginTop: 20 }}
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </Card>
        </Col>

        {/* Content Tabs */}
        <Col xs={24} md={18}>
          <Card>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccountPage;
