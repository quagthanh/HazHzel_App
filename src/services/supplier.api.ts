import { sendRequest } from "@/utils/api";
import { TopSupplier } from "@/types/interface";

export async function getTopSuppliers() {
  return sendRequest<TopSupplier[]>({
    url: "/suppliers/top/3",
    method: "GET",
  });
}
