import { sendRequest } from "@/utils/api";

interface ProductResponseData {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: any[];
}

export async function getProductsForAdmin({
  current,
  pageSize,
  accessToken,
}: {
  current: number;
  pageSize: number;
  accessToken?: string;
}) {
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
  }
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
  state: { color: string; size: string }
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
  }
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
  }
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
  }
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
