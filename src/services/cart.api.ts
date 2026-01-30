"use server";

import http from "@/utils/axios-server";
interface AddToCartDTO {
  userId: string;
  payload: {
    items: {
      productId: string;
      variantId: string;
      quantity: number;
    }[];
  };
}
export async function addToCartAPI({
  userId,
  payload,
}: AddToCartDTO): Promise<any> {
  try {
    const result = await http.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/${userId}`,
      payload,
    );
    console.log("Check result of add to card :", result.data);
    return result.data;
  } catch (error) {
    return error;
  }
}
