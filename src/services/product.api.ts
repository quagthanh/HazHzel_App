"use server";
import { auth } from "@/auth";
import { ResponseData } from "@/types/interface";
import { ProductResponseData } from "@/types/product";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function getProductsForAdmin({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}) {
  return sendRequest<ResponseData<any>>({
    url: "/products/admin",
    method: "GET",
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

  return sendRequest<ResponseData<any>>({
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
  const slug = "local-supply";
  return sendRequest<ProductResponseData>({
    url: `/products/home-new-brand/${slug}`,
    method: "GET",
  });
}

export async function createProductsForAdmin(formData: FormData) {
  return sendRequestFile<any>({
    url: "/products",
    method: "POST",
    body: formData,
  });
}

export async function updateProductsForAdmin({
  _id,
  formData,
}: {
  _id: string;
  formData: FormData;
}) {
  return sendRequestFile<any>({
    url: `/products/${_id}`,
    method: "PATCH",
    body: formData,
  });
}
export async function deleteProductsForAdmin(_id: string) {
  return sendRequest<any>({
    url: `/products/${_id}`,
    method: "DELETE",
  });
}
