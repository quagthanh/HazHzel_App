"use client";

import { useEffect } from "react";
import axios from "axios";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  useEffect(() => {
    if (session?.user?.access_token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.user.access_token}`;
      console.log("Axios Client Token Set!");
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [session]);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
