"use client";
import { api } from "@/utils/api";

export async function getProduct({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}): Promise<any> {
  try {
    const result = await api.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?current=${current}&pageSize=${pageSize}`
    );
    return result;
  } catch (error) {
    throw error;
  }
}
