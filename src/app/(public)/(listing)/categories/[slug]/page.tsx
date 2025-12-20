"use client";

import TitleHeaderCenter from "@/components/common/customer/title-center";
import FilterBar from "@/components/common/customer/filter-bar";
import ProductGrid from "@/components/common/customer/product-grid";
import { Pagination } from "antd";

export default function CategoryPage() {
  return (
    <>
      <TitleHeaderCenter title="Women" />
      <FilterBar />

      <div>
        <ProductGrid />
        <Pagination total={500} />
      </div>
    </>
  );
}
