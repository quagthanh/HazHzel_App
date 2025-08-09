"use client";

import Image from "next/image";
import styles from "@/components/common/customer/order-summary/style.module.scss";
import product1 from "@/../public/assets/Boston_Clogs_in_Antique_White_test.jpg";
import product2 from "@/../public/assets/Maison_Balzac_Olive_test.jpg";
import CustomButton from "../public-button";

export default function OrderSummary() {
  return (
    <div className={styles.orderSummary}>
      <div className={styles.item}>
        <div className={styles.imgWrapper}>
          <Image
            src={product1}
            alt="Signature Chain Bracelet"
            width={60}
            height={60}
          />
          <span className={styles.qty}>1</span>
        </div>
        <div className={styles.info}>
          <p className={styles.name}>
            Signature Chain Bracelet - Sterling Silver
          </p>
          <p className={styles.price}>₫1,745,000</p>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.imgWrapper}>
          <Image
            src={product2}
            alt="Saschia Knit Cardigan"
            width={60}
            height={60}
          />
          <span className={styles.qty}>2</span>
        </div>
        <div className={styles.info}>
          <p className={styles.name}>Saschia Knit Cardigan - White Marle</p>
          <p className={styles.price}>₫4,345,000</p>
        </div>
      </div>

      <div className={styles.couponRow}>
        <input type="text" placeholder="Discount code or gift card" />
        <button>Apply</button>
      </div>

      <div className={styles.summaryRow}>
        <span>Subtotal · 2 items</span>
        <span>₫6,090,000</span>
      </div>

      <div className={styles.summaryRow}>
        <span>
          Shipping <span title="Shipping info">ⓘ</span>
        </span>
        <span>₫331,000</span>
      </div>

      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
        <span>Total</span>
        <span>
          <small>VND</small> ₫6,421,000
        </span>
      </div>
      <div className={styles.checkoutBtn}>
        <CustomButton>pay now</CustomButton>
      </div>
    </div>
  );
}
