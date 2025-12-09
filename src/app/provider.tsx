"use client";
import { useAppStore } from "@/library/stores/useAppStore";
import TokenSync from "@/library/tokenSync";
import { SessionProvider, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SessionProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TokenSync />
      <SessionGate>{children}</SessionGate>
    </SessionProvider>
  );
}
function SessionGate({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const pathname = usePathname();

  const { reloaded, markReloaded }: any = useAppStore();

  useEffect(() => {
    const isLoginPage = pathname.startsWith("/auth/login");

    if (!isLoginPage && status === "unauthenticated" && !reloaded) {
      markReloaded();
      window.location.reload();
    }
  }, [status, pathname, reloaded]);

  if (status === "loading") return null;
  return <>{children}</>;
}
