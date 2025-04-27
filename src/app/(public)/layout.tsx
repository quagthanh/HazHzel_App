import PublicFooter from "@/components/layout/public/customer.footer";
import PublicHeader from "@/components/layout/public/customer.header";
import { Layout } from "antd";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const layoutStyle = {};
  return (
    <div>
      <Layout style={layoutStyle}>
        <PublicHeader />
        {children}
        <PublicFooter />
      </Layout>
    </div>
  );
};
export default PublicLayout;
