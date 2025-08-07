"use client";
import styles from "@/components/common/customer/list-cart-item/style.module.scss";
import Image from "next/image";
import example from "@/../public/assets/fortune_cardigan.webp";
import { InputNumber, InputNumberProps } from "antd";
import { ICartItem } from "@/types/interface";
const items = [
  {
    id: 1,
    name: "Sunglasses",
    category: "SVS Essential Crew - Beige",
    price: "€90,95",
    size: "xs",
    count: "1",
  },
  {
    id: 2,
    name: "Sunglasses",
    category: "SVS Essential Crew - Beige",
    price: "€90,95",
    size: "xs",
    count: "1",
  },
  {
    id: 3,
    name: "Sunglasses",
    category: "SVS Essential Crew - Beige",
    price: "€90,95",
    size: "xs",
    count: "1",
  },
  {
    id: 3,
    name: "Sunglasses",
    category: "SVS Essential Crew - Beige",
    price: "€90,95",
    size: "xs",
    count: "1",
  },
  {
    id: 3,
    name: "Sunglasses",
    category: "SVS Essential Crew - Beige",
    price: "€90,95",
    size: "xs",
    count: "1",
  },
  {
    id: 3,
    name: "Sunglasses",
    category: "SVS Essential Crew - Beige",
    price: "€90,95",
    size: "xs",
    count: "1",
  },
];
const CartItem: React.FC<ICartItem> = ({ onChangeTable = false }) => {
  const onChange: InputNumberProps["onChange"] = (value) => {
    //input number logic
  };
  return (
    <>
      {onChangeTable && (
        <div className={styles.cartHeader}>
          <span>Product</span>
          <span>Name</span>
          <span>Price</span>
          <span>Size</span>
          <span>Quantity</span>
        </div>
      )}
      {items.map((item) => (
        <div className={styles.cartItem}>
          <div className={styles.cartImgWrapper}>
            <Image width={120} height={180} src={example} alt="cart Item" />
          </div>
          <div className={styles.productInfo}>
            <a href="/collection/">{item.category}</a>
            <a href="/product/">{item.name}</a>
            <a>{item.price}</a>
            <a>{item.size}</a>
            <div className={styles.quantityItem}>
              <InputNumber
                min={1}
                max={10}
                defaultValue={item.count}
                onChange={onChange}
                changeOnWheel
              />
              <button className={styles.removeLink}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default CartItem;
