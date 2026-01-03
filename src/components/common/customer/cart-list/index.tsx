"use client";

import { Table, InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import styles from "../cart/style.module.scss";
import { CartItemType, useCartStore } from "@/library/stores/useCartStore";

const CartList = () => {
  const { items, updateQuantity, removeItem } = useCartStore();

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
      width: "55%",
      render: (_: any, record: CartItemType) => (
        <div className={styles.productCell}>
          <div className={styles.imageWrapper}>
            <Image
              src={record.image}
              alt={record.name}
              width={100}
              height={140}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.productMeta}>
            <Link href="#" className={styles.brand}>
              {record.brand}
            </Link>
            <Link href="#" className={styles.name}>
              {record.name}
            </Link>
            <span className={styles.size}>Size: {record.size}</span>
            <span className={styles.priceMobile}>
              {record.price.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      width: "15%",
      responsive: ["md"] as any, // Ẩn trên mobile
      render: (price: number) => (
        <span className={styles.priceText}>
          {price.toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      width: "30%",
      render: (_: any, record: CartItemType) => (
        <div className={styles.quantityWrapper}>
          <InputNumber
            min={1}
            max={record.maxStock}
            value={record.quantity}
            onChange={(val) => val && updateQuantity(record.id, val)}
            className={styles.inputNumber}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeItem(record.id)}
            className={styles.removeBtn}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.cartListContainer}>
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey="id"
        className={styles.customTable}
      />
    </div>
  );
};

export default CartList;
