"use client";
import { api } from "@/utils/api";

export async function getTopSuppliers() {
  try {
    const result = await api.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/suppliers/top/3`
    );
    return result;
  } catch (error) {
    throw error;
  }
}
