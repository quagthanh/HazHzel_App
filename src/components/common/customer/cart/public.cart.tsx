"use client";

import CartTable from "@/components/common/customer/cart-table";
export default function PublicCartPage() {
  const cartItems = [
    {
      id: 1,
      brand: "ELKA COLLECTIVE",
      name: "SASCHIA KNIT CARDIGAN - WHITE MARLE",
      price: 4349000,
      size: "XL",
      image: "/images/product1.jpg",
      quantity: 2,
    },
    {
      id: 2,
      brand: "SOMETHING VERY SPECIAL",
      name: "SVS ESSENTIAL CREW - BEIGE",
      price: 2777000,
      size: "XS",
      image: "/images/product2.jpg",
      quantity: 1,
    },
  ];

  return <CartTable items={cartItems} />;
}
