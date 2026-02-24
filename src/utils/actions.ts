"use server";
import { signIn } from "@/auth";
import { FormData } from "@/components/common/auth/login-form/login-form";
import { auth } from "@/auth";

export async function authenticate(formData: FormData) {
  try {
    const { username, password } = formData;
    const r = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    return r;
  } catch (error) {
    console.log("CHeck error name:", error);
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if ((error as any).name === "InactiveAccountError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return { error: "Internal server error", code: 0 };
    }
  }
}
