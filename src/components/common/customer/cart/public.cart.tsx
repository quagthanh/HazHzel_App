"use client";

import { useEffect } from "react";
import { Row, Col, Spin, Empty } from "antd";
import styles from "./style.module.scss";
import { useCartStore } from "@/library/stores/useCartStore";
import CartList from "../cart-list";
import CartSummary from "../cart-summary";

const PublicCartPage = () => {
  const { items, isLoading, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Loading cart..." />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <Empty description="Your cart is currently empty." />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>YOUR CART</h1>

      <Row gutter={[40, 40]}>
        <Col xs={24} lg={16}>
          <CartList />
        </Col>

        <Col xs={24} lg={8}>
          <CartSummary />
        </Col>
      </Row>
    </div>
  );
};

export default PublicCartPage;
