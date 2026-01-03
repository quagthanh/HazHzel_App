import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Montserrat } from "next/font/google";
import "@/scss/partial/_body.scss";
import PreventFlash from "@/components/common/preventFlash";
import { auth } from "@/auth";
import AuthProvider from "./provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AccounFreak",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider session={session}>
          <AntdRegistry>{children}</AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
