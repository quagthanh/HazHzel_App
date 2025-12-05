import { auth } from "@/auth";
import { PageNotFound } from "@/components/common/pagenotfound";
import UserTable from "@/components/feature/admin/user.table";
import { getUser } from "@/services/user.api";

const ManageUserPage = async (props: any) => {
  const session = await auth();
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 5;

  const res = await getUser();

  if (!res || +res.statusCode == 404) {
    return (
      <>
        <div>Không lấy được thông tin người dùng</div>
        <div>Có vấn đề xảy ra trong lúc fetch users</div>
      </>
    );
  }
  if (current > res.data?.meta?.pages) {
    return <PageNotFound />;
  }
  return (
    <div>
      <UserTable users={res?.data?.data?.result ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default ManageUserPage;
