import { sendRequest } from "@/utils/api";

export const getTopViewedProducts = async () => {
  return sendRequest<any>({
    url: `/products/actions/top-viewed`,
    method: "GET",
  });
};

export const searchProducts = async (keyword: string) => {
  return sendRequest<any>({
    url: `/products/actions/search`,
    method: "GET",
    queryParams: { keyword },
  });
};

export const searchCollections = async (keyword: string) => {
  return sendRequest<any>({
    url: `/collections/actions/search`,
    method: "GET",
    queryParams: { keyword },
  });
};
