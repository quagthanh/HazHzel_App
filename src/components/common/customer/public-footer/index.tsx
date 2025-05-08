"use client";
import styles from "@/components/common/customer/public-footer/style.module.scss";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerInner}>
          <div className={styles.footerBlockList}>
            <div>
              <h3>ABOUT OUR STORE</h3>
              <p>ESTABLISHED 2020</p>
              <p>
                Locale Potts Point is passionate about bringing the best of
                Australian
              </p>
            </div>
            <div>
              <h3>JOIN TEAM LOCALE</h3>
              <p>
                Subscribe to receive updates to new collections, VIP access to
                sales, access to exclusive deals, and MUCH MORE.
              </p>
            </div>
            <div>
              <h3>VISIT THE STORE</h3>
              <p>Shop 5, 127-133 Macleay St, Potts Point, NSW 2011</p>
              <p>0404 868 702</p>
            </div>
          </div>
          <div className={styles.socialMedia}>
            <Link href="#">
              <Button
                type="link"
                icon={
                  <FacebookOutlined
                    style={{ color: "gray", fontSize: "20px" }}
                  />
                }
              />
            </Link>
            <Link href="#">
              <Button
                type="link"
                icon={
                  <InstagramOutlined
                    style={{ color: "gray", fontSize: "20px" }}
                  />
                }
              />
            </Link>

            <Link href="#">
              <Button
                type="link"
                icon={
                  <TwitterOutlined
                    style={{ color: "gray", fontSize: "20px" }}
                  />
                }
              />
            </Link>
          </div>
          <div className={styles.footerAside}>@2025 ACCOUNT FREAK</div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Footer;
