import UserListClient from "@/components/common/admin/user/user.list";
import { getUser } from "@/services/user.api";
import { auth } from "@/auth";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageUserPage = async ({ searchParams }: PageProps) => {
  // 2. Lấy Token Server
  const session = await auth();
  const token = session?.user?.access_token;

  // 3. Parse Params
  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 20;

  // 4. Khởi tạo data
  let users: any = [];
  let meta = { current: 1, pageSize: 20, total: 0, pages: 0 };

  try {
    // 5. Gọi API
    const res = await getUser({
      current,
      pageSize,
      accessToken: token,
    });

    // 6. Xử lý kết quả (Backend trả về: { data: { meta: ..., result: ... } })
    const backendData = res?.data?.data;
    if (backendData) {
      users = backendData.result || [];
      meta = backendData.meta || meta;
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }

  // 7. Render Client
  return <UserListClient initialUsers={users} initialMeta={meta} />;
};

export default ManageUserPage;
