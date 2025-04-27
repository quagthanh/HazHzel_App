import PublicFooter from "@/components/layout/public/customer.footer";
import PublicHeader from "@/components/layout/public/customer.header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
};
export default PublicLayout;
