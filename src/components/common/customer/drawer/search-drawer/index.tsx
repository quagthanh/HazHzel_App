"use client";
import React, { useState, useEffect } from "react";
import { Drawer, Col, Row, Input, Empty } from "antd";
import Image from "next/image";
import Link from "next/link";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "@/components/common/customer/drawer/search-drawer/style.module.scss";
import logo from "@/../public/assets/test6.png";
import { SearchDrawerProps } from "@/types/interface";
import {
  MOCK_PRODUCTS,
  MOCK_SUGGESTIONS,
  MOCK_COLLECTIONS,
} from "@/shared/mockdata"; // Import data giả

const SearchDrawer: React.FC<SearchDrawerProps> = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "collections">(
    "products"
  );

  // Logic Delay 0.5s (Debounce)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter Data dựa trên debouncedTerm
  const filteredProducts = debouncedTerm
    ? MOCK_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(debouncedTerm.toLowerCase())
      )
    : []; // Nếu chưa search thì rỗng hoặc hiện gợi ý tuỳ ý

  const filteredSuggestions = debouncedTerm
    ? MOCK_SUGGESTIONS.filter((s) => s.includes(debouncedTerm.toLowerCase()))
    : MOCK_SUGGESTIONS;

  // Hàm highlight text (Bôi đậm phần khớp)
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={i} style={{ color: "black" }}>
              {part}
            </b>
          ) : (
            <span key={i} style={{ color: "#777" }}>
              {part}
            </span>
          )
        )}
      </span>
    );
  };

  return (
    <Drawer
      open={open}
      placement="top"
      height="100vh" // Full màn hình để đẹp giống mẫu
      style={{ backgroundColor: "rgb(255, 251, 245)" }}
      onClose={onClose}
      closable={false}
      maskClosable={true}
    >
      {/* === HEADER === */}
      <div className={styles.headerWrapper}>
        <Row align="middle" gutter={[16, 0]}>
          {/* Logo */}
          <Col xs={4} sm={3} md={2}>
            <div className={styles.logoContainer}>
              <Image
                src={logo}
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Col>

          {/* Transparent Input */}
          <Col xs={16} sm={19} md={20}>
            <div className={styles.searchBox}>
              <SearchOutlined className={styles.searchIcon} />
              <Input
                placeholder="SEARCH"
                variant="borderless"
                className={styles.transparentInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </Col>

          {/* Close Button */}
          <Col xs={4} sm={2} md={2} style={{ textAlign: "right" }}>
            <CloseOutlined className={styles.closeIcon} onClick={onClose} />
          </Col>
        </Row>
      </div>

      {/* === BODY CONTENT === */}
      <div className={styles.contentWrapper}>
        <Row gutter={[40, 40]}>
          {/* LEFT COLUMN: SUGGESTIONS */}
          <Col xs={24} md={6}>
            <h4 className={styles.sectionTitle}>SUGGESTIONS</h4>
            <ul className={styles.suggestionList}>
              {filteredSuggestions.map((item, index) => (
                <li key={index} onClick={() => setSearchTerm(item)}>
                  {" "}
                  {/* Click gợi ý điền vào input */}
                  {getHighlightedText(item, debouncedTerm)}
                </li>
              ))}
            </ul>
          </Col>

          {/* RIGHT COLUMN: TABS & RESULTS */}
          <Col xs={24} md={18}>
            {/* Tabs Header */}
            <div className={styles.tabsHeader}>
              <button
                className={`${styles.tabBtn} ${
                  activeTab === "products" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("products")}
              >
                PRODUCTS
              </button>
              <button
                className={`${styles.tabBtn} ${
                  activeTab === "collections" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("collections")}
              >
                COLLECTIONS
              </button>
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
              {activeTab === "products" ? (
                <>
                  {filteredProducts.length > 0 ? (
                    <Row gutter={[20, 30]}>
                      {filteredProducts.slice(0, 4).map((product) => (
                        <Col key={product.id} xs={12} sm={12} md={6}>
                          <div className={styles.productCard}>
                            <div className={styles.productImage}>
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                              />
                            </div>
                            <div className={styles.productInfo}>
                              <p className={styles.brand}>{product.brand}</p>
                              <h5 className={styles.name}>{product.name}</h5>
                              <p className={styles.price}>{product.price}</p>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Empty
                      description={
                        debouncedTerm
                          ? "No products found"
                          : "Start typing to search"
                      }
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}

                  {/* Nút View All */}
                  {filteredProducts.length > 0 && (
                    <div className={styles.viewAllContainer}>
                      <Link
                        href={`/search?q=${debouncedTerm}`}
                        className={styles.viewAllBtn}
                      >
                        VIEW ALL RESULTS ({filteredProducts.length})
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                // COLLECTIONS TAB
                <div className={styles.collectionsList}>
                  {MOCK_COLLECTIONS.map((col) => (
                    <div key={col.id} className={styles.collectionItem}>
                      <h3>{col.title}</h3>
                      <span>{col.count} items</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Drawer>
  );
};

export default SearchDrawer;
