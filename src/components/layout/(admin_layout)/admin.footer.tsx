"use client";
import { Layout } from "antd";

const AdminFooter = () => {
  const { Footer } = Layout;

  return (
    <Footer style={{ textAlign: "center" }}>
      AccountFreak ©{new Date().getFullYear()} Created by @AccountFreak
    </Footer>
  );
};

export default AdminFooter;
