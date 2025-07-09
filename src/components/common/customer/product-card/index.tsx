"use client";
import Image from "next/image";
import example from "@/../public/assets/fortune_cardigan.webp";
import exampl2 from "@/../public/assets/Maison_Balzac_Olive_test.jpg";

import styles from "@/components/common/customer/product-card/style.module.scss";
import { IProduct } from "@/types/interface";
import { PlusOutlined } from "@ant-design/icons";

const ProductCard = ({
  id,
  name,
  image,
  category,
  specificColor,
  soldOut,
}: IProduct) => {
  return (
    <div className={`${styles.card} ${soldOut ? styles.soldOut : ""}`}>
      <div className={styles.imageWrapper}>
        <Image src={example} alt={name} fill className={styles.image} />
        <Image
          src={exampl2}
          alt={`${name} hover`}
          fill
          className={`${styles.image} ${styles.hoverImage}`}
        />
        <button className={styles.addToCart}>
          <PlusOutlined size={18} className={styles.plusIcon} />
        </button>
      </div>
      <p className={styles.productName}>{name}</p>
      <p className={styles.productName}>{category}</p>
      <p className={styles.productName}>{specificColor}</p>
    </div>
  );
};

export default ProductCard;
