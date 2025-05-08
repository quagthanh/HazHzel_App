import { auth } from "@/auth";
import FirstDashboard from "@/components/feature/admin/firstdashboard";

const DashboardPage = async () => {
  const session = await auth();
  if (!session) {
    return <div>Khong lay duoc session moi</div>;
  }
  return <FirstDashboard session={session}></FirstDashboard>;
};

export default DashboardPage;
