import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Montserrat } from "next/font/google";
import NextAuthWrapper from "@/library/next.auth.wrapper";
import "@/scss/partial/_body.scss";
import { ConfigProvider } from "antd";

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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#7D7D7D",
              fontFamily: "Montserrat, sans-serif",
            },
            components: {
              Input: {
                colorText: "#343534",
                colorBgContainer: "#fffbf5",
              },
              Button: {
                colorBgContainer: "#fffbf5",
              },
              Pagination: {
                colorBgContainer: "#fffbf5",
              },
              Select: {
                colorBgContainer: "#fffbf5",
              },
              InputNumber: {
                activeBg: "#fffbf5",
                colorBgContainer: "#fffbf5",
              },
              Table: {
                colorBgContainer: "#fffbf5",
                rowHoverBg: "#fffbf5",
                headerBg: "#fffbf5",
              },
            },
          }}
        >
          <AntdRegistry>
            <NextAuthWrapper>{children}</NextAuthWrapper>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
