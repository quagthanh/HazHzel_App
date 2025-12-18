import PublicContent from "@/components/layout/public/customer.content";
import PublicFooter from "@/components/layout/public/customer.footer";
import PublicHeader from "@/components/layout/public/customer.header";
import { ConfigProvider, Layout } from "antd";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const layoutStyle = {};
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7D7D7D",
            fontFamily: "Montserrat, sans-serif",
          },
          components: {
            Input: {
              colorText: "#343534",
              colorBgContainer: "#fffbf5",
            },
            Button: {
              colorBgContainer: "#fffbf5",
            },
            Pagination: {
              colorBgContainer: "#fffbf5",
            },
            Select: {
              colorBgContainer: "#fffbf5",
            },
            InputNumber: {
              activeBg: "#fffbf5",
              colorBgContainer: "#fffbf5",
            },
            Table: {
              colorBgContainer: "#fffbf5",
              rowHoverBg: "#fffbf5",
              headerBg: "#fffbf5",
            },
          },
        }}
      >
        <Layout style={layoutStyle}>
          <PublicHeader />
          <PublicContent>{children}</PublicContent>
          <PublicFooter />
        </Layout>
      </ConfigProvider>
    </div>
  );
};
export default PublicLayout;
