"use client";
import styles from "@/components/common/customer/main-detail-image/style.module.scss";
const MainImage = () => {
  const images = [
    "/assets/img1.webp",
    "/assets/img2.webp",
    "/assets/img3.webp",
    "/assets/img4.webp",
  ];

  return (
    <div className={styles.mainImage}>
      {images.map((src, index) => (
        <img
          key={index}
          id={`main-image-${index}`}
          src={src}
          alt={`main-${index}`}
          className={styles.mainImageItem}
        />
      ))}
    </div>
  );
};
export default MainImage;
