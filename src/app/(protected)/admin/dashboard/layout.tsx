import { auth } from "@/auth";
import AdminDashBoardLayout from "@/components/layout/admin_layout/admin.index";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  return <AdminDashBoardLayout session={session}>{children}</AdminDashBoardLayout>;
};

export default AdminLayout;
