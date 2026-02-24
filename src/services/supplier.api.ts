"use server";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { TopSupplier } from "@/types/interface";
import { revalidatePath } from "next/cache";

export async function getTopSuppliers() {
  return sendRequest<TopSupplier[]>({
    url: "/suppliers/top/3",
    method: "GET",
  });
}

export async function getSupplier({
  current,
  pageSize,
}: {
  current?: number;
  pageSize?: number;
} = {}) {
  return sendRequest<any>({
    url: "/suppliers",
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
  });
}

export async function getSuppliersForAdmin(params: any) {
  return sendRequest<any>({
    url: `/suppliers?sort=-createdAt`,
    method: "GET",
    queryParams: params,
  });
}

export async function createSupplier(formData: FormData) {
  return sendRequestFile<any>({
    url: "/suppliers",
    method: "POST",
    body: formData,
  });
}

export async function updateSupplier({
  _id,
  formData,
}: {
  _id: string;
  formData: FormData;
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/suppliers/${_id}`,
      {
        method: "PATCH",
        body: formData,
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      try {
        const errorJson = JSON.parse(errorText);
        return {
          statusCode: res.status,
          message: errorJson.message || errorJson.error || "Upload failed",
          data: null,
        };
      } catch {
        return {
          statusCode: res.status,
          message: errorText,
          data: null,
        };
      }
    }
    const payload = await res.json();
    revalidatePath("/admin/dashboard/supplier/list");
    return {
      statusCode: 201,
      message: "Success",
      data: payload,
    };
  } catch (error) {
    console.log("Error edit supplier:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export async function deleteSupplier(_id: string) {
  return sendRequest<any>({
    url: `/suppliers/${_id}`,
    method: "DELETE",
  });
}
