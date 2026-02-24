"use client";
import Image from "next/image";
import logo from "@/../public/assets/test6.png";
import styles from "@/components/common/customer/public-header/style.module.scss";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CartDrawer from "../drawer/cart-drawer";
import SearchDrawer from "../drawer/search-drawer";
import { NavMenuItem } from "@/types/navbar";
import { hasMegaMenu } from "@/utils/helper";
import DesktopNav from "../nav/desktop-nav";
import MobileNav from "../nav/moble-nav";
import NavIcons from "../nav/nav-icons";
interface NavBarProps {
  items: NavMenuItem[];
}
const NavBar: React.FC<NavBarProps> = ({ items }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const showMobileMenu = () => setOpenMobileMenu(true);
  const closeMobileMenu = () => setOpenMobileMenu(false);
  const showDrawerCart = () => {
    setOpenCart(true);
  };
  const showDrawerSearch = () => {
    setOpenSearch(true);
  };

  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: 100,
    backgroundColor: "rgb(255, 251, 245)",
    display: "flex",
    alignItems: "center",
    padding: "10px 48px",
    justifyContent: "space-between",
    fontWeight: "600",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textTransform: "uppercase",
  };
  return (
    <Header style={headerStyle} className={styles.headerMain}>
      <div className={styles.headerLogo}>
        <div className={styles.leftMobileNav}>
          <Button
            type="link"
            icon={<MenuOutlined style={{ color: "gray", fontSize: "20px" }} />}
            onClick={showMobileMenu}
          />
        </div>
        <div className={styles.centerLogo}>
          <Link href="/" className={styles.headerLogo}>
            <Image style={{ objectFit: "contain" }} alt="Logo" src={logo} />
          </Link>
        </div>
      </div>
      <DesktopNav items={items} />
      <NavIcons />
      <MobileNav
        open={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
        items={items}
      />
    </Header>
  );
};
export default NavBar;
