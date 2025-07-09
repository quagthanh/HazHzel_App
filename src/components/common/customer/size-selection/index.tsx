"use client";
import styles from "@/components/common/customer/size-selection/style.module.scss";
const SizeSelector = () => {
  return (
    <div>
      <label>Size</label>
      <div className={styles.sizeOptions}>
        {["S", "M", "L"].map((size) => (
          <button key={size}>{size}</button>
        ))}
      </div>
    </div>
  );
};
export default SizeSelector;
