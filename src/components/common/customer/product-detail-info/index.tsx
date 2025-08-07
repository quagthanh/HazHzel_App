"use client";
import styles from "@/components/common/customer/product-detail-info/style.module.scss";
import SizeSelector from "../size-selection";
import PaymentOptions from "../payment-option";
import ProductDetailsTabs from "../product-detail-tabs";
import CustomButton from "@/components/common/customer/public-button";
const ProductInfo = () => {
  return (
    <div className={styles.productInfo}>
      <h2>SOMETHING VERY SPECIAL</h2>
      <h1>FORTUNE TELLER CARDIGAN</h1>
      <p className={styles.price}>€124,95</p>
      <p className={styles.stock}>Only 1 unit left</p>

      <SizeSelector />

      <CustomButton>ADD TO CART</CustomButton>
      <PaymentOptions />

      <ul className={styles.benefits}>
        <li>Free Shipping over $99</li>
        <li>Easy 28 day returns</li>
      </ul>
      <ProductDetailsTabs />
    </div>
  );
};

export default ProductInfo;
