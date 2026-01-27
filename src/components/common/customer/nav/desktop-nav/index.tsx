"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import { DesktopNavProps, NavMenuItem } from "@/types/navbar";
import { getAbsoluteUrl, hasMegaMenu } from "@/utils/helper";

const DesktopNav: React.FC<DesktopNavProps> = ({ items }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className={styles.headerPrimaryNav}>
      <ul className={styles.unstyledList}>
        {items.map((item) => (
          <li
            key={item.href}
            className={styles.headerPrimaryNavItem}
            onMouseEnter={() => hasMegaMenu(item) && setOpenDropdown(item.href)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <div className={styles.h6}>
              <Link
                href={getAbsoluteUrl(item.href)}
                className={`${styles.h6} ${styles.underline} ${
                  pathname === getAbsoluteUrl(item.href) ? styles.active : ""
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
                  {/* CỘT TEXT */}
                  {item.childrenColumns && (
                    <div className={styles.menuColumnsWrapper}>
                      {item.childrenColumns.map((col, idx) => (
                        <div key={idx} className={styles.menuColumn}>
                          <h4 className={styles.columnTitle}>{col.title}</h4>
                          <ul className={styles.columnList}>
                            {col.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={getAbsoluteUrl(link.href)}
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

                  {/* HÌNH ẢNH PROMO */}
                  {item.promos && (
                    <div className={styles.menuPromosWrapper}>
                      {item.promos.map((promo, idx) => (
                        <Link
                          href={getAbsoluteUrl(promo.href)}
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
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
