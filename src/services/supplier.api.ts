"use server";
import { auth } from "@/auth";
import { IBackendRes, sendRequest, sendRequestFile } from "@/utils/api";
import { TopSupplier } from "@/types/interface";
import { revalidatePath } from "next/cache";
const getAccesstoken = async () => {
  const session = await auth();
  return session?.user?.access_token;
};
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
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: "/suppliers",
    method: "GET",
    accessToken: accessToken,
    queryParams: {
      current,
      pageSize,
    },
  });
}

export async function getSuppliersForAdmin(params: any) {
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: `/suppliers?sort=-createdAt`,
    method: "GET",
    queryParams: params,
    accessToken,
  });
}

export async function createSupplier(formData: FormData) {
  const session = await auth();
  const token = session?.user?.access_token;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/suppliers`,
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
    revalidatePath("/admin/dashboard/supplier/list");
    return {
      statusCode: 201,
      message: "Success",
      data: payload,
    };
  } catch (error) {
    console.log("Error create supplier:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export async function updateSupplier({
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/suppliers/${_id}`,
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
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: `/suppliers/${_id}`,
    method: "DELETE",
    accessToken: accessToken,
  });
}
