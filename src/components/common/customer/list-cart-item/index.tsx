"use client";
import styles from "@/components/common/customer/list-cart-item/style.module.scss";
import Image from "next/image";
import example from "@/../public/assets/fortune_cardigan.webp";
import { InputNumber, InputNumberProps } from "antd";
const items = [
  {
    id: 1,
    name: "Sunglasses",
    category: "SVS Essential Crew - Beige",
    price: "€90,95",
    size: "xs",
    count: "12",
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
interface CartItemProps {
  layout?: "vertical" | "two-column";
}

const CartItem = ({ layout = "vertical" }: CartItemProps) => {
  const onChange: InputNumberProps["onChange"] = (value) => {};

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.cartItem} ${
            layout === "two-column" ? styles.twoColumn : ""
          }`}
        >
          {layout === "two-column" ? (
            <>
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
                    max={12}
                    defaultValue={item.count}
                    onChange={onChange}
                    changeOnWheel
                  />
                  <button className={styles.removeLink}>Remove</button>
                </div>
              </div>
            </>
          ) : (
            <>
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
                    max={12}
                    defaultValue={item.count}
                    onChange={onChange}
                    changeOnWheel
                  />
                  <button className={styles.removeLink}>Remove</button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};
export default CartItem;
