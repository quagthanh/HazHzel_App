import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Open_Sans } from 'next/font/google'
import "@/app/globals.css";
import NextAuthWrapper from "@/library/next.auth.wrapper";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({
  subsets: ['latin'], 
 
});

export const metadata: Metadata = {
  title: "AccounFreak",
  icons: "/accountfreak_icon-removebg-preview.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AntdRegistry>
          <NextAuthWrapper>{children}</NextAuthWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
