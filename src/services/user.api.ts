"use server";

import { auth } from "@/auth";
import { IBackendRes } from "@/types/backend";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export interface IUserData {
  name: string;
  email: string;
  password: string;
}
export const handleCreateUser = async ({
  name,
  email,
  password,
}: IUserData) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "POST",
    headers: { Authorization: `Bearer ${session?.user?.access_token}` },
    body: { name, email, password },
  });
  revalidateTag("users");
  return res;
};
export const handleDeleteUser = async (props: any) => {
  const { _id } = props;
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${_id}`,
    method: "DELETE",
    headers: { Authorization: `Bearer ${session?.user?.access_token}` },
  });
  revalidateTag("users");
  return res;
};

export const handleEditUser = async (props: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...props },
  });
  revalidateTag("users");
  return res;
};
