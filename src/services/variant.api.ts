"use server";

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidatePath } from "next/cache";
const getAccesstoken = async () => {
  const session = await auth();
  return session?.user?.access_token;
};
export async function getVariantsByProductId(productId: string) {
  try {
    const accessToken = await getAccesstoken();

    const res = await sendRequest<any>({
      url: `/variants/by-product/${productId}`,
      method: "GET",
      accessToken,
    });
    if (!res) return [];

    let cleanData: any = [];

    if (Array.isArray(res)) {
      cleanData = res;
      console.log("Fetched variants (array):", cleanData);
    } else if (res.data.data && Array.isArray(res.data.data)) {
      cleanData = res.data.data;
    }
    console.log("Fetched variants (arra12y):", cleanData);

    // 3. NUCLEAR OPTION: "Tẩy rửa" hoàn toàn object bằng JSON parse/stringify
    // Cách này loại bỏ mọi function, circular ref, header ẩn của Axios
    return JSON.parse(JSON.stringify(cleanData));
  } catch (error) {
    console.error("Error fetching variants:", error);
    return []; // Luôn trả về mảng rỗng nếu lỗi, không throw error object
  }
}
export async function createVariant(formData: FormData) {
  const session = await auth();
  const token = session?.user?.access_token;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/variants`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      try {
        const json = JSON.parse(errorText);
        return { statusCode: res.status, message: json.message || "Error" };
      } catch {
        return { statusCode: res.status, message: errorText };
      }
    }
    revalidatePath("/admin/dashboard/product/list");
    return { statusCode: 201, message: "Success", data: await res.json() };
  } catch (error) {
    return { statusCode: 500, message: "Internal Server Error" };
  }
}

export async function updateVariant({
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/variants/${_id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      try {
        const json = JSON.parse(errorText);
        return { statusCode: res.status, message: json.message || "Error" };
      } catch {
        return { statusCode: res.status, message: errorText };
      }
    }

    return { statusCode: 200, message: "Success", data: await res.json() };
  } catch (error) {
    return { statusCode: 500, message: "Internal Server Error" };
  }
}

export async function deleteVariant(_id: string) {
  const session = await auth();
  const token = session?.user?.access_token;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/variants/${_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
