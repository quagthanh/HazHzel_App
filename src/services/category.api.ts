"use server";

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidatePath } from "next/cache";

const getAccesstoken = async () => {
  const session = await auth();
  return session?.user?.access_token;
};
export async function getCategory({
  current,
  pageSize,
}: {
  current?: number;
  pageSize?: number;
} = {}) {
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: "/categories",
    method: "GET",
    accessToken: accessToken,
    queryParams: {
      current,
      pageSize,
    },
  });
}
export async function getCategoriesForAdmin(params: any) {
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: `/categories?sort=-createdAt`,
    method: "GET",
    queryParams: params,
    accessToken,
  });
}

export async function createCategory(formData: FormData) {
  const session = await auth();
  const token = session?.user?.access_token;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
      {
        method: "POST",
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
    console.log("Error create category:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
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
    console.log("Error edit category:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export async function deleteCategory(_id: string) {
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: `/categories/${_id}`,
    method: "DELETE",
    accessToken: accessToken,
  });
}
