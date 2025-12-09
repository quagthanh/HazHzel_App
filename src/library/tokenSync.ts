"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "./stores/useAuthStore";
export default function TokenSync() {
  const { data: session } = useSession();
  console.log("Check session sync:", session);
  const setToken = useAuthStore((s) => s.setToken);
  useEffect(() => {
    setToken(session?.access_token ?? null);
  }, [session]);
  return null;
}
