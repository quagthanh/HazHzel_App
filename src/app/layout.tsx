import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Montserrat } from "next/font/google";
import "@/scss/partial/_body.scss";
import PreventFlash from "@/components/common/preventFlash";
import { SessionProviders } from "./provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AccounFreak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SessionProviders>
          <PreventFlash />
          <AntdRegistry>{children}</AntdRegistry>
        </SessionProviders>
      </body>
    </html>
  );
}
