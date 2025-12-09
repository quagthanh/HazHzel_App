"use client";
import { api } from "@/utils/api";

export async function getUser({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}): Promise<any> {
  try {
    const result = await api.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?current=${current}&pageSize=${pageSize}`
    );
    return result;
  } catch (error) {
    throw error;
  }
}
export async function handleCreateUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const result = await api.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
      { name, email, password }
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}
export async function handleEditUser(data: any) {
  try {
    const result = await api.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
      data
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}
