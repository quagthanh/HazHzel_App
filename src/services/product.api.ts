"use server";
import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidatePath } from "next/cache";

interface ProductResponseData {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: any[];
}
const getAccesstoken = async () => {
  const session = await auth();
  return session?.user?.access_token;
};
export async function getProductsForAdmin({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}) {
  const accessToken = await getAccesstoken();
  return sendRequest<ProductResponseData>({
    url: "/products/admin",
    method: "GET",
    accessToken: accessToken,
    queryParams: {
      current,
      pageSize,
    },
  });
}
//Product by gender
export async function getProducts(
  gender: string,
  params: {
    current: number;
    pageSize: number;
  },
) {
  if (gender) {
    gender = gender.toUpperCase();
  }
  console.log("Check query:", gender);

  return sendRequest<ProductResponseData>({
    url: "/products",
    method: "GET",
    queryParams: { gender, current: params.current, pageSize: params.pageSize },
  });
}
//GET detail product
export async function getDetailProduct(
  slug: string,
  state: { color: string; size: string },
) {
  return sendRequest<ProductResponseData>({
    url: `/products/${slug}?color=${state.color}&size=${state.size}`,
    method: "GET",
    queryParams: {},
  });
}
//Product by store(supplier)
export async function getProductsByStore(
  slug: string,
  params: {
    current: number;
    pageSize: number;
    category?: string;
    size?: string;
    minPrice?: string | number;
    maxPrice?: string | number;
    inStock?: string;
    sort?: string;
  },
) {
  return sendRequest<ProductResponseData>({
    url: `/products/by-supplier/${slug}`,
    method: "GET",
    queryParams: params,
  });
}
//Product by category
export async function getProductsByCategory(
  slug: string,
  params: {
    current: number;
    pageSize: number;
    minPrice?: string | number;
    maxPrice?: string | number;
    sort?: string;
    size?: string;
    brand?: string;
  },
) {
  console.log("Fetch products by category with params:", params);
  return sendRequest<ProductResponseData>({
    url: `/products/by-category/${slug}`,
    method: "GET",
    queryParams: params,
  });
}
//Product by collection
export async function getProductsByCollection(
  slug: string,
  params: {
    current: number;
    pageSize: number;
    minPrice?: string | number;
    maxPrice?: string | number;
    sort?: string;
    size?: string;
    brand?: string;
  },
) {
  return sendRequest<ProductResponseData>({
    url: `/products/by-collection/${slug}`,
    method: "GET",
    queryParams: params,
  });
}

export async function getHomeProductBySupplier() {
  const slug = "oas-company";
  return sendRequest<ProductResponseData>({
    url: `/products/home-new-brand/${slug}`,
    method: "GET",
  });
}

export async function createProductsForAdmin(formData: FormData) {
  const session = await auth();
  const token = session?.user?.access_token;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

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

    revalidatePath("/admin/dashboard/product/list");

    return {
      statusCode: 201,
      message: "Success",
      data: payload,
    };
  } catch (error) {
    console.log("Error create product:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export async function updateProductsForAdmin({
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${_id}`,
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

    revalidatePath("/admin/dashboard/product/list");

    return {
      statusCode: 201,
      message: "Success",
      data: payload,
    };
  } catch (error) {
    console.log("Error edit product:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}
export async function deleteProductsForAdmin(_id: string) {
  const accessToken = await getAccesstoken();
  return sendRequest<any>({
    url: `/products/${_id}`,
    method: "DELETE",
    accessToken: accessToken,
  });
}
