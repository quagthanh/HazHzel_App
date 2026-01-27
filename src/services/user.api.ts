"use server";
import { sendRequest } from "@/utils/api";
import { IUserTable } from "@/types/backend";
import { auth } from "@/auth";

interface UserResponseData {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IUserTable[];
}
const getAccesstoken = async () => {
  const session = await auth();
  return session?.user?.access_token;
};
export async function getUser({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}) {
  const accessToken = await getAccesstoken();
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
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: "/users",
    method: "POST",
    body: data,
    accessToken,
  });
}

export async function handleEditUser(data: any) {
  const accessToken = await getAccesstoken();

  return sendRequest<any>({
    url: "/users",
    method: "PATCH",
    body: data,
    accessToken,
  });
}

export async function handleDeleteUser(id: string) {
  const accessToken = await getAccesstoken();

  return sendRequest<any>({
    url: `/users/${id}`,
    method: "DELETE",
    accessToken,
  });
}
