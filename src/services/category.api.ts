"use server";

import { auth } from "@/auth";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function getCategory({
  current,
  pageSize,
}: {
  current?: number;
  pageSize?: number;
} = {}) {
  return sendRequest<any>({
    url: "/categories",
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
  });
}
export async function getCategoriesForAdmin(params: any) {
  return sendRequest<any>({
    url: `/categories?sort=-createdAt`,
    method: "GET",
    queryParams: params,
  });
}

export async function createCategory(formData: FormData) {
  return sendRequestFile<any>({
    url: "/categories",
    method: "POST",
    body: formData,
  });
}

export async function updateCategory({
  _id,
  formData,
}: {
  _id: string;
  formData: FormData;
}) {
  const session = await auth();
  const token = session?.user?.access_token;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${_id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    revalidatePath("/admin/dashboard/category/list");
    return {
      statusCode: 201,
      message: "Success",
      data: payload,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export async function deleteCategory(_id: string) {
  return sendRequest<any>({
    url: `/categories/${_id}`,
    method: "DELETE",
  });
}
