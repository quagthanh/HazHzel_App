import { PageNotFound } from "@/components/common/pagenotfound";
import UserTable from "@/components/feature/admin/user.table";
import { getUser } from "@/services/user.api";

const ManageUserPage = async () => {
  return <UserTable />;
};

export default ManageUserPage;
