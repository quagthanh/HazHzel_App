"use client";
import React from "react";
import Link from "next/link";
import { Drawer, Collapse } from "antd";
import { RightOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import { MobileNavProps, NavMenuItem } from "@/types/navbar";
import { getAbsoluteUrl, hasMegaMenu } from "@/utils/helper";

const MobileNav: React.FC<MobileNavProps> = ({ open, onClose, items }) => {
  return (
    <Drawer
      title="MENU"
      placement="left"
      onClose={onClose}
      open={open}
      width={320}
      styles={{ body: { padding: 0 } }}
    >
      <Collapse
        accordion
        ghost
        expandIconPosition="end"
        className={styles.mobileCollapse}
      >
        {items.map((item) => {
          if (hasMegaMenu(item)) {
            return (
              <Collapse.Panel
                header={
                  <span className={styles.mobileMenuHeader}>{item.label}</span>
                }
                key={item.href}
              >
                {item.childrenColumns?.map((col, idx) => (
                  <div key={idx} className={styles.mobileSubGroup}>
                    <h5 className={styles.mobileSubTitle}>{col.title}</h5>
                    <ul className={styles.mobileSubList}>
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={getAbsoluteUrl(link.href)}
                            onClick={onClose}
                            className={styles.mobileSubLink}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <Link
                  href={getAbsoluteUrl(item.href)}
                  onClick={onClose}
                  className={styles.mobileViewAllLink}
                >
                  View All {item.label}{" "}
                  <RightOutlined style={{ fontSize: 10 }} />
                </Link>
              </Collapse.Panel>
            );
          }

          return (
            <div key={item.href} className="ant-collapse-item">
              <div
                className="ant-collapse-header"
                style={{ padding: "12px 16px" }}
              >
                <Link
                  href={getAbsoluteUrl(item.href)}
                  onClick={onClose}
                  className={styles.mobileMenuHeader}
                  style={{ display: "block", width: "100%" }}
                >
                  {item.label}
                </Link>
              </div>
            </div>
          );
        })}
      </Collapse>
    </Drawer>
  );
};

export default MobileNav;
