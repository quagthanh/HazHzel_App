"use client";

import store_banner from "@/assets/store-banner.png";
import Image from "next/image";
import BreadcrumbPublic from "../breadcrumb";
import styles from "@/components/common/customer/title-center/style.module.scss";
const TitleHeaderCenter = ({ title }: { title: string }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumb}>
        <BreadcrumbPublic />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.bannerWrapper}>
        <Image
          className={styles.bannerImage} // Class này để chỉnh object-fit
          src={store_banner}
          alt="store banner"
          fill // Bắt buộc dùng fill khi muốn ảnh tự tràn theo container cha
          priority // Load ưu tiên vì là banner đầu trang
          sizes="100vw" // Giúp trình duyệt chọn kích thước ảnh phù hợp
        />
      </div>
    </div>
  );
};
export default TitleHeaderCenter;
