"use client";

import { useEffect, useState } from "react";
import ProductCard from "../product-card";
import styles from "@/components/common/customer/product-grid/style.module.scss";
import useGridStore from "@/library/stores/useGridStore";
const products = [
  {
    id: 1,
    name: "Sunglasses",
    category: "car",
    image: "/glasses.jpg",
    soldOut: true,
  },
  {
    id: 2,
    name: "Leather Belt",
    category: "car",
    specificColor: 1,
    image: "/belt.jpg",
  },
  {
    id: 3,
    name: "Bomber Jacket",
    category: "car",
    specificColor: 1,
    image: "/jacket.jpg",
  },
  {
    id: 4,
    name: "Green Jacket",
    category: "car",
    specificColor: 1,
    image: "/green-jacket.jpg",
  },
  {
    id: 5,
    name: "Sunglasses",
    category: "car",
    specificColor: 1,
    image: "/glasses.jpg",
    soldOut: true,
  },
  {
    id: 6,
    name: "Leather Belt",
    category: "car",
    specificColor: 1,
    image: "/belt.jpg",
  },
  {
    id: 7,
    name: "Bomber Jacket",
    category: "car",
    specificColor: 1,
    image: "/jacket.jpg",
  },
  {
    id: 8,
    name: "Green Jacket",
    category: "car",
    specificColor: 1,
    image: "/green-jacket.jpg",
  },
  {
    id: 9,
    name: "Green Jacket",
    category: "car",
    specificColor: 1,
    image: "/green-jacket.jpg",
  },
  {
    id: 10,
    name: "Sunglasses",
    category: "car",
    image: "/glasses.jpg",
    soldOut: true,
  },
  {
    id: 11,
    name: "Sunglasses",
    category: "car",
    image: "/glasses.jpg",
    soldOut: true,
  },
  {
    id: 12,
    name: "Leather Belt",
    category: "car",
    specificColor: 1,
    image: "/belt.jpg",
  },
  {
    id: 13,
    name: "Bomber Jacket",
    category: "car",
    specificColor: 1,
    image: "/jacket.jpg",
  },
  {
    id: 14,
    name: "Green Jacket",
    category: "car",
    specificColor: 1,
    image: "/green-jacket.jpg",
  },
  {
    id: 15,
    name: "Sunglasses",
    category: "car",
    specificColor: 1,
    image: "/glasses.jpg",
    soldOut: true,
  },
  {
    id: 16,
    name: "Leather Belt",
    category: "car",
    specificColor: 1,
    image: "/belt.jpg",
  },
  {
    id: 17,
    name: "Bomber Jacket",
    category: "car",
    specificColor: 1,
    image: "/jacket.jpg",
  },
  {
    id: 18,
    name: "Green Jacket",
    category: "car",
    specificColor: 1,
    image: "/green-jacket.jpg",
  },
  {
    id: 19,
    name: "Green Jacket",
    category: "car",
    specificColor: 1,
    image: "/green-jacket.jpg",
  },
];
const ProductGrid = () => {
  const column = useGridStore((state) => state.column);
  const mobileColumn = useGridStore((state) => state.mobileColumn);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${isMobile ? mobileColumn : column},1fr )`,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
