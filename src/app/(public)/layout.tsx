import PublicContent from "@/components/layout/public/customer.content";
import PublicFooter from "@/components/layout/public/customer.footer";
import PublicHeader from "@/components/layout/public/customer.header";
import { Layout } from "antd";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const layoutStyle = {};
  return (
    <div>
      <Layout style={layoutStyle}>
        <PublicHeader />
        <PublicContent>{children}</PublicContent>
        <PublicFooter />
      </Layout>
    </div>
  );
};
export default PublicLayout;
