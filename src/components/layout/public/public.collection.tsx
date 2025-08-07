"use client";

import BreadcrumbPublic from "@/components/common/customer/breadcrumb";
import MainContent from "@/components/common/customer/category-content";
import FilterBar from "@/components/common/customer/filter-bar";
import TitleHeaderCenter from "@/components/common/customer/title-center";
import { usePathname } from "next/navigation";

export const filters = {
  productTypes: [
    { id: "hoodie", name: "Hoodies", productCount: 25 },
    { id: "jacket", name: "Jackets", productCount: 12 },
    { id: "pants", name: "Pants", productCount: 20 },
    { id: "tshirt", name: "T-Shirts", productCount: 0 },
  ],
  brands: [
    { id: "nike", name: "Nike", productCount: 30 },
    { id: "adidas", name: "Adidas", productCount: 25 },
    { id: "balenciaga", name: "Balenciaga", productCount: 5 },
    { id: "unknown", name: "Unknown", productCount: 0 },
  ],
  sizes: [
    { id: "s", name: "S", productCount: 50 },
    { id: "m", name: "M", productCount: 70 },
    { id: "l", name: "L", productCount: 10 },
    { id: "xl", name: "XL", productCount: 0 },
  ],
  availability: [
    { id: "in-stock", name: "In Stock", productCount: 110 },
    { id: "out-of-stock", name: "Out of Stock", productCount: 29 },
  ],
};
export const products = [
  {
    id: "p1",
    name: "Graphic Red Cardigan",
    brand: "Balenciaga",
    price: 249.99,
    imageUrl: "/images/products/red-cardigan.jpg",
    isNew: true,
    productType: "hoodie",
    sizeAvailable: ["S", "M"],
    availability: "in-stock",
  },
  {
    id: "p2",
    name: "Black Velvet Tracksuit",
    brand: "Givenchy",
    price: 349.99,
    imageUrl: "/images/products/black-tracksuit.jpg",
    isNew: true,
    productType: "pants",
    sizeAvailable: ["M", "L"],
    availability: "in-stock",
  },
  {
    id: "p3",
    name: "Oversized Denim Jacket",
    brand: "Nike",
    price: 179.99,
    imageUrl: "/images/products/denim-jacket.jpg",
    isNew: false,
    productType: "jacket",
    sizeAvailable: ["S", "M", "L"],
    availability: "out-of-stock",
  },
];

const PublicCollectionPage = () => {
  return (
    <>
      <TitleHeaderCenter />
      <FilterBar />
      <MainContent />
    </>
  );
};

export default PublicCollectionPage;
