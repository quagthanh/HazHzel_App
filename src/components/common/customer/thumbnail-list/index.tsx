"use client";
import styles from "@/components/common/customer/thumbnail-list/style.module.scss";
const ThumbnailList = ({ images }: { images: string[] }) => {
  const handleClick = (index: number) => {
    const image = document.getElementById(`main-image-${index}`);
    image?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className={styles.thumbnailList}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`thumb-${index}`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default ThumbnailList;
