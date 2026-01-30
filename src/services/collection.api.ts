"use server";
import { auth } from "@/auth";
import { IBackendRes, sendRequest, sendRequestFile } from "@/utils/api";
import { TopSupplier } from "@/types/interface";
import { revalidatePath } from "next/cache";
const getAccesstoken = async () => {
  const session = await auth();
  return session?.user?.access_token;
};

export async function getCollectionsForAdmin(params: any) {
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: `/collections?sort=-createdAt`,
    method: "GET",
    queryParams: params,
    accessToken,
  });
}

export async function createCollection(formData: FormData) {
  const session = await auth();
  const token = session?.user?.access_token;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections`,
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
    revalidatePath("/admin/dashboard/collection/list");
    return {
      statusCode: 201,
      message: "Success",
      data: payload,
    };
  } catch (error) {
    console.log("Error create collection:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export async function updateCollection({
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${_id}`,
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
    revalidatePath("/admin/dashboard/collection/list");
    return {
      statusCode: 201,
      message: "Success",
      data: payload,
    };
  } catch (error) {
    console.log("Error edit collection:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export async function deleteCollection(_id: string) {
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: `/collections/${_id}`,
    method: "DELETE",
    accessToken: accessToken,
  });
}
