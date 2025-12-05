import { ILogin, loginDTO } from "@/types/backend";
import { api } from "@/utils/api";

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
