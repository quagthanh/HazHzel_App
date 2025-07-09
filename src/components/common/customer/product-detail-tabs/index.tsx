"use client";
import styles from "@/components/common/customer/product-detail-tabs/style.module.scss";
import { useState } from "react";
import DropdownSection from "../filter-sidebar.tsx/DropdownSection";
const ProductDetailsTabs = () => {
  const DROPDOWN_DATA: { label: string; items?: string[] }[] = [
    {
      label: "Description",
      items: ["Accessories"],
    },
    {
      label: "Shipping & Return",
      items: ["Barney Cools"],
    },
  ];
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));
  return (
    <div className={styles.sidebar}>
      {DROPDOWN_DATA.map(({ label, items }) => (
        <DropdownSection
          key={label}
          label={label}
          isOpen={openDropdown === label}
          onToggle={() => toggleDropdown(label)}
        >
          <ul className={styles.dropdownList}>
            {items?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </DropdownSection>
      ))}
    </div>
  );
};
export default ProductDetailsTabs;
