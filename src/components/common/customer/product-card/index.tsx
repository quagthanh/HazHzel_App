"use client";
import Image from "next/image";
import example from "@/../public/assets/fortune_cardigan.webp";
import exampl2 from "@/../public/assets/Maison_Balzac_Olive_test.jpg";

import styles from "@/components/common/customer/product-card/style.module.scss";
import { IProduct } from "@/types/interface";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ROUTE_CONFIG } from "@/shared/configs/route";
import { Noto_Sans_Old_Sogdian } from "next/font/google";
import { statusProduct } from "@/types/enum";

const ProductCard = ({
  name,
  slug,
  images,
  categoryId,
  status,
  supplierId,
  isHot,
  originalPrice,
  currentPrice,
  isSale,
}: IProduct) => {
  const isInactive = status === statusProduct.INACTIVE;
  const mainImage = images?.[0]?.secure_url;
  const hoverImage = images?.[1]?.secure_url ?? mainImage;

  return (
    <Link href={`${ROUTE_CONFIG.product}/${slug}`}>
      <div className={`${styles.card} ${isInactive ? styles.soldOut : ""}`}>
        <div className={styles.imageWrapper}>
          <Image src={mainImage} alt={name} fill className={styles.image} />
          <Image
            src={hoverImage}
            alt={`${name} hover`}
            fill
            className={`${styles.image} ${styles.hoverImage}`}
          />
          <button className={styles.addToCart}>
            <PlusOutlined size={18} className={styles.plusIcon} />
          </button>
        </div>
        <div className={styles.productInfo}>
          <div className={styles.categoryTag}>{categoryId?.name}</div>
          <h3 className={styles.productName}>{name}</h3>
          <div className={styles.priceWrapper}>
            {isSale && (
              <span className={styles.originalPrice}>
                {originalPrice ? originalPrice.toLocaleString("vi-VN") : 0}₫
              </span>
            )}
            <span className={styles.price}>
              {currentPrice ? currentPrice.toLocaleString("vi-VN") : 0}₫
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
