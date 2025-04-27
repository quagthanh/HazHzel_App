"use client";
import Image from "next/image";
import "@/components/common/customer/public-header/style.module.scss";
import logo from "@/../public/assets/test5.png";
import styles from "@/components/common/customer/public-header/style.module.scss";
import { Header } from "antd/es/layout/layout";
import { Button, Menu } from "antd";
import {
  DiscordOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const NavBar = () => {
  const items = [
    {
      key: "dashboard",
      label: <Link href={"#"}>Dashboard</Link>,
    },
    {
      key: "users",
      label: <Link href={"#"}>Quản lý người dùng</Link>,
    },
    {
      key: "user1212s",
      label: <Link href={"#"}>Quản lý người dùng</Link>,
    },
    {
      key: "usedqdqrs",
      label: <Link href={"#"}>Quản lý người dùng</Link>,
    },
    {
      key: "usdqdqers",
      label: <Link href={"#"}>Quản lý người dùng</Link>,
    },
  ];

  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    gap: "24px", // Thêm gap để tạo khoảng cách giữa các phần tử
  };

  return (
    <>
      <Header style={headerStyle}>
        <Image className={styles.headerLogo} height={50} alt="" src={logo} />
        <Menu
          className={styles.headerPrimaryNav}
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["dashboard"]}
          items={items}
        />
        <div className="">
          <Button
            type="link"
            icon={<DiscordOutlined />}
            className="text-white hover:text-[#8A2BE2]"
          />
          <Button
            type="link"
            icon={<TwitterOutlined />}
            className="text-white hover:text-[#8A2BE2]"
          />
          <Button
            type="link"
            icon={<InstagramOutlined />}
            className="text-white hover:text-[#8A2BE2]"
          />
          <Button
            type="link"
            icon={<YoutubeOutlined />}
            className="text-white hover:text-[#8A2BE2]"
          />
        </div>
      </Header>
      <div></div>
    </>
  );
};
export default NavBar;
