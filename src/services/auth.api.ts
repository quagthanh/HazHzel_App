import { ILogin, loginDTO } from "@/types/backend";
import { api } from "@/utils/api";

// export async function handleQuery<T>(arg: T): Promise<T> {
//   return arg;
// }
export type retryActiveDTO = {
  email: string;
};

// export async function handleRetryActive(retryActive: retryActiveDTO) {
//   const result = await handleQuery<retryActiveDTO>(retryActive);
//   return result;
// }

export async function handleLogin(loginDTO: loginDTO): Promise<any> {
  try {
    const result = await api.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      loginDTO
    );
    return result;
  } catch (error) {
    return error;
  }
}

type checkCodeDTO = {
  _id: string;
  code: string;
};
export async function handleRetryActive(
  retryActive: retryActiveDTO
): Promise<any> {
  try {
    const result = await api.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/retry-active`,
      retryActive
    );
    return result;
  } catch (error) {
    throw error;
  }
}
export async function handleCheckCode(checkCode: checkCodeDTO): Promise<any> {
  try {
    const result = await api.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-code`,
      checkCode
    );
    return result;
  } catch (error) {
    return error;
  }
}
