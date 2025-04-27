import { auth } from "@/auth";
import { PageNotFound } from "@/components/common/pagenotfound";
import UserTable from "@/components/feature/admin/user.table";
import { IBackendRes } from "@/types/backend";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

const ManageUserPage = async (props: any) => {
  const session = await auth();
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 5;

  const res = await sendRequest<IBackendRes<any>>({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    queryParams: { current, pageSize },
    nextOption: { tags: ["users"], revalidate: 60 },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  if (!res || +res.statusCode == 404) {
    // console.log("Có vấn đề xảy ra trong lúc fetch users");
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
      <UserTable users={res?.data?.result ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default ManageUserPage;
