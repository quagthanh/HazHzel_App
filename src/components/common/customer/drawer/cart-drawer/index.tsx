"use client";
import { Drawer, Space } from "antd";
import CancelButton from "../../cancel-button";
import CustomButton from "@/components/common/customer/public-button";
import styles from "@/components/common/customer/drawer/cart-drawer/style.module.scss";
import CartItem from "../../list-cart-item";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const router = useRouter();
  const handleCloseDrawer = () => {
    onClose();
    setTimeout(() => {
      router.push("/cart");
    }, 0);
  };
  return (
    <Drawer
      title={<p>CART</p>}
      placement="right"
      maskClosable={false}
      open={open}
      bodyStyle={{ padding: "0 1.5rem" }}
      closeIcon={false}
      style={{ backgroundColor: "rgb(255, 251, 245)" }}
      extra={
        <Space>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </Space>
      }
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <CartItem onChangeTable={false}></CartItem>
        </div>
        <div className={styles.drawerFooter}>
          <CustomButton onClick={handleCloseDrawer}>View cart</CustomButton>

          <CustomButton>check out</CustomButton>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
