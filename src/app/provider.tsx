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

  if (status === "loading") {
    return <div></div>;
  }

  return <>{children}</>;
}
