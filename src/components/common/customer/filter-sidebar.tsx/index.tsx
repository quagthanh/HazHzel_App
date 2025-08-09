"use client";
import { useState } from "react";
import styles from "@/components/common/customer/filter-sidebar.tsx/style.module.scss";
import { Slider, Switch } from "antd";
import DropdownSection from "@/components/common/customer/filter-sidebar.tsx/DropdownSection";

const DROPDOWN_DATA: { label: string; items?: string[] }[] = [
  {
    label: "Product Type",
    items: [
      "Accessories",
      "Bath Robe",
      "Hoods & Sweats",
      "Jacket",
      "Knitwear",
      "L/S Shirt",
      "Pants",
      "Polo",
      "S/S Shirt",
      "Shoes",
      "Shorts",
      "Swim",
      "Tank",
      "Tee's",
      "Tops",
      "Vest",
    ],
  },
  {
    label: "Brand",
    items: [
      "Barney Cools",
      "Birkenstock",
      "Cariuma",
      "Golden Hour",
      "Kore Studios",
      "Local Supply",
      "Mr Odet",
      "Mr Simple",
      "Nudie Jeans",
      "OAS",
      "Seva Mont",
      "Something Very Special",
      "The Laundry Room",
      "The Tales",
    ],
  },
  {
    label: "Size",
    items: ["S", "M", "L"],
  },
  {
    label: "More Filters",
    items: [
      "Women",
      "Men",
      "Accessories",
      "Hoods & Sweats",
      "Jacket",
      "Knitwear",
      "L/S Shirt",
      "Pants",
      "Polo",
      "S/S Shirt",
      "Shoes",
      "Shorts",
      "sunglasses",
      "Tank",
      "Tees",
      "Tops",
      "Vest",
    ],
  },
];

export default function FilterSidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000000]);
  const handleStockChange = (checked: boolean) => {
    // Handle "In stock only" switch toggle
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
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
      <DropdownSection
        label="Price"
        isOpen={openDropdown === "Price"}
        onToggle={() => toggleDropdown("Price")}
      >
        <div className={styles.priceSort}>
          <Slider
            range
            min={0}
            max={1000000000}
            step={10000}
            value={priceRange}
            onChange={handlePriceChange}
          />
          <div>
            {priceRange[0].toLocaleString()} ₫ -{" "}
            {priceRange[1].toLocaleString()} ₫
          </div>
        </div>
      </DropdownSection>
      <DropdownSection
        label="Availability"
        isOpen={openDropdown === "Availability"}
        onToggle={() => toggleDropdown("Availability")}
      >
        <div className={styles.switchRow}>
          <Switch defaultChecked onChange={handleStockChange} />
          <span>In stock only</span>
        </div>
      </DropdownSection>
    </div>
  );
}
