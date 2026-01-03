"use client";
import Image from "next/image";
import logo from "@/../public/assets/test6.png";
import styles from "@/components/common/customer/public-header/style.module.scss";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CartDrawer from "../drawer/cart-drawer";
import SearchDrawer from "../drawer/search-drawer";
import { NavMenuItem } from "@/types/navbar";
interface NavBarProps {
  items: NavMenuItem[];
}
const NavBar: React.FC<NavBarProps> = ({ items }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
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
  const hasMegaMenu = (item: NavMenuItem) => {
    return (
      (item.childrenColumns && item.childrenColumns.length > 0) ||
      (item.promos && item.promos.length > 0)
    );
  };
  return (
    <Header style={headerStyle} className={styles.headerMain}>
      <div className={styles.headerLogo}>
        <div className={styles.leftMobileNav}>
          <Button
            type="link"
            icon={<MenuOutlined style={{ color: "gray", fontSize: "20px" }} />}
          />
        </div>
        <div className={styles.centerLogo}>
          <Link href="/" className={styles.headerLogo}>
            <Image style={{ objectFit: "contain" }} alt="Logo" src={logo} />
          </Link>
        </div>
      </div>
      <nav className={styles.headerPrimaryNav}>
        <ul className={styles.unstyledList}>
          {items.map((item) => (
            <li
              key={item.href}
              className={styles.headerPrimaryNavItem}
              onMouseEnter={() =>
                hasMegaMenu(item) && setOpenDropdown(item.href)
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className={styles.h6}>
                <Link
                  href={item.href}
                  className={`${styles.h6} ${styles.underline} ${
                    pathname === item.href ? styles.active : ""
                  }`}
                >
                  {item.label}
                </Link>
              </div>

              {/* === MEGA MENU RENDER === */}
              {hasMegaMenu(item) && (
                <div
                  className={`${styles.megaMenu} ${
                    openDropdown === item.href ? styles.megaMenuActive : ""
                  }`}
                >
                  <div className={styles.megaMenuContainer}>
                    {/* KHU VỰC 1: CỘT TEXT (Text Columns) */}
                    {item.childrenColumns && (
                      <div className={styles.menuColumnsWrapper}>
                        {item.childrenColumns.map((col, idx) => (
                          <div key={idx} className={styles.menuColumn}>
                            <h4 className={styles.columnTitle}>{col.title}</h4>
                            <ul className={styles.columnList}>
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className={styles.linkFaded}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* KHU VỰC 2: HÌNH ẢNH (Promo Images) */}
                    {item.promos && (
                      <div className={styles.menuPromosWrapper}>
                        {item.promos.map((promo, idx) => (
                          <Link
                            href={promo.href}
                            key={idx}
                            className={styles.promoCard}
                          >
                            <div className={styles.promoImageContainer}>
                              <Image
                                src={promo.image}
                                alt={promo.title}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <div className={styles.promoContent}>
                              <span className={styles.promoBrand}>
                                {promo.store}
                              </span>
                              <span className={styles.promoTitle}>
                                {promo.title}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* === END MEGA MENU === */}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.headerSecondaryNav}>
        <Link href="#">
          <Button
            type="link"
            icon={<UserOutlined style={{ color: "gray", fontSize: "24px" }} />}
          />
        </Link>
        <Link href="#">
          <Button
            type="link"
            icon={
              <SearchOutlined style={{ color: "gray", fontSize: "24px" }} />
            }
            onClick={() => showDrawerSearch()}
          />
        </Link>

        <Link href="#">
          <Button
            type="link"
            icon={
              <ShoppingCartOutlined
                style={{ color: "gray", fontSize: "24px" }}
              />
            }
            onClick={() => showDrawerCart()}
          />
        </Link>
        <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
        <SearchDrawer open={openSearch} onClose={() => setOpenSearch(false)} />
      </div>
    </Header>
  );
};
export default NavBar;
