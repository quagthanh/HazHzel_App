"use client";
import { Drawer } from "antd";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      title={<p>CART</p>}
      closable={true}
      placement="right"
      maskClosable={false}
      open={open}
      onClose={onClose}
      style={{ backgroundColor: "rgb(255, 251, 245)" }}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default CartDrawer;
