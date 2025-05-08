"use client";
import { Layout } from "antd";

const PublicContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { Content } = Layout;

  return (
    <Content>
      <div
        style={{
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default PublicContent;
