"use client";
import styles from "@/components/common/customer/main-detail-image/style.module.scss";
export const MainImage = ({ images }: { images: string[] }) => {
  return (
    <div className={styles.mainImage}>
      {images.map((src, index) => (
        <img
          key={index}
          id={`main-image-${index}`}
          src={src}
          className={styles.mainImageItem}
          alt="main"
        />
      ))}
    </div>
  );
};
