import { sendRequest } from "@/utils/api";
import { IUserTable } from "@/types/backend";

interface UserResponseData {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IUserTable[];
}

export async function getUser({
  current,
  pageSize,
  accessToken,
}: {
  current: number;
  pageSize: number;
  accessToken?: string;
}) {
  return sendRequest<UserResponseData>({
    url: "/users",
    method: "GET",
    accessToken,
    queryParams: {
      current,
      pageSize,
    },
  });
}

export async function handleCreateUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return sendRequest<IUserTable>({
    url: "/users",
    method: "POST",
    body: data,
  });
}

export async function handleEditUser(data: any) {
  return sendRequest<IUserTable>({
    url: "/users",
    method: "PATCH",
    body: data,
  });
}

export async function handleDeleteUser(id: string) {
  return sendRequest<any>({
    url: `/users/${id}`,
    method: "DELETE",
  });
}
