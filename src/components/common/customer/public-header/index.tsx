"use client";
import Image from "next/image";
import logo from "@/../public/assets/test6.png";
import styles from "@/components/common/customer/public-header/style.module.scss";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types/interface";
import imgexam from "@/../public/assets/exam.jpg";
const NavBar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      href: "/men",
      label: "Men",
      data_title: "Men",
      children: [
        {
          label: "Clothing",
          href: "/men-clothing",
          subChildren: [
            { label: "Jeans", href: "/men-clothing-jeans" },
            { label: "Jackets", href: "/men-clothing-jackets" },
          ],
        },
        {
          label: "Accessories",
          href: "/men-accessories",
          subChildren: [
            { label: "Perfumes", href: "/men-accessories-perfumes" },
          ],
        },
        { label: "Sale", href: "/men-sale" },
      ],
      promos: [
        {
          href: "#",
          image: imgexam,
          data_title: "kore studios",
          subtitle: "Euro Summer Vibes",
        },
      ],
    },
    {
      href: "/women",
      label: "Women",
      data_title: "Women",
    },
    {
      href: "/brands",
      label: "BRANDS",
      data_title: "BRANDS",
    },

    {
      href: "/new-arrivals",
      label: "New Arrivals",
      data_title: "New Arrivals",
      children: [
        {
          label: "New Mens",
          href: "/new-arrivals-menwears",
          subChildren: [{ label: "Dresses", href: "/arrival/dresses" }],
        },
        {
          label: "New Womens",
          href: "/new-arrivals-womanwears",
          subChildren: [{ label: "Dresses", href: "/arrival/dresses" }],
        },
      ],
    },
    {
      href: "/gift-cards",
      label: "Gift Cards",
      data_title: "Gift Cards",
    },
    {
      href: "/home-wares",
      label: "Homewares",
      data_title: "Homewares",
    },
    {
      href: "/art-work",
      label: "Artwork",
      data_title: "Artwork",
    },
    {
      href: "/sale",
      label: "sALE",
      data_title: "sALE",
    },
    {
      href: "/locale-rewards",
      label: "Locale Rewards",
      data_title: "Locale Rewards",
    },
  ];

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
    <>
      <Header style={headerStyle} className={styles.headerMain}>
        <div className={styles.headerLogo}>
          <Link href="/" className={styles.headerLogo}>
            <Image style={{ objectFit: "contain" }} alt="" src={logo} />
          </Link>
        </div>
        <nav className={styles.headerPrimaryNav}>
          <ul className={styles.unstyledList}>
            {navItems.map((item) => (
              <li
                key={item.href}
                className={styles.headerPrimaryNavItem}
                data-title={item.data_title}
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children?.length ? (
                  <div className={styles.megaMenuDisclosure}>
                    <details
                      className={styles.headerMenuDisclosure}
                      open={openDropdown == item.href}
                    >
                      <summary className={styles.h6}>
                        <Link
                          href={item.href}
                          className={`${styles.h6} ${
                            pathname === item.href ? styles.active : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      </summary>
                      <div className={styles.megaMenu}>
                        <ul
                          className={`${styles.megaMenuLinkList} ${styles.unstyledList}`}
                        >
                          {/* miniheader 1 */}
                          {item.children?.map((child) => (
                            <li
                              key={child.href}
                              className={`${styles.vStack} ${styles.justifyItemsStart} ${styles.gap5}`}
                            >
                              <Link href={child.href} className={styles.h6}>
                                {child.label}
                              </Link>

                              {/* miniheader 2 */}
                              {child.subChildren && (
                                <ul
                                  className={`${styles.vStack} ${styles.gap25} ${styles.unstyledList}`}
                                >
                                  {child.subChildren.map((subChild) => (
                                    <li key={subChild.href}>
                                      <Link
                                        href={subChild.href}
                                        className={styles.linkFaded}
                                      >
                                        {subChild.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`${styles.h6} ${
                      pathname === item.href ? styles.active : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.headerSecondaryNav}>
          <Link href="#">
            <Button
              type="link"
              icon={
                <UserOutlined style={{ color: "gray", fontSize: "24px" }} />
              }
            />
          </Link>
          <Link href="#">
            <Button
              type="link"
              icon={
                <SearchOutlined style={{ color: "gray", fontSize: "24px" }} />
              }
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
            />
          </Link>
        </div>
      </Header>
      <div></div>
    </>
  );
};
export default NavBar;

// {navItems.map((item) => (
//   <div key={item.href}>
//     <Link
//       href={item.href}
//       className={`${styles.link} ${
//         pathname === item.href ? styles.active : ""
//       }`}
//     >
//       {item.label}
//     </Link>
//   </div>
// ))}
