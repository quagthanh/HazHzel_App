import UserListClient from "@/components/common/admin/user/user.list";
import { getUser } from "@/services/user.api";
import { auth } from "@/auth";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageUserPage = async ({ searchParams }: PageProps) => {
  const session = await auth();
  const token = session?.user?.access_token;

  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 20;

  let users: any = [];
  let meta = { current: 1, pageSize: 20, total: 0, pages: 0 };

  try {
    const res = await getUser({
      current,
      pageSize,
      accessToken: token,
    });

    const backendData = res?.data?.data;
    if (backendData) {
      users = backendData.result || [];
      meta = backendData.meta || meta;
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }

  return <UserListClient initialUsers={users} initialMeta={meta} />;
};

export default ManageUserPage;
