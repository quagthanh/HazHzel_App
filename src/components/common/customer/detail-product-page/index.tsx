"use client";
import styles from "@/components/common/customer/detail-product-page/style.module.scss";
import ThumbnailList from "../thumbnail-list";
import MainImage from "../main-detail-image";
import ProductInfo from "../product-detail-info";
const DetailPage = () => {
  return (
    <div className={`${styles.productPage} ${styles.colorSchema}`}>
      <div className={styles.productGrid}>
        <ThumbnailList />
        <MainImage />
        <ProductInfo />
      </div>
    </div>
  );
};
export default DetailPage;
