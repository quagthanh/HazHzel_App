"use client";
import styles from "@/components/common/customer/category-content/style.module.scss";
import FilterSidebar from "../filter-sidebar.tsx";
import ProductGrid from "@/components/common/customer/product-grid";
const MainContent = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <FilterSidebar />
      </aside>
      <section className={styles.grid}>
        <ProductGrid />
      </section>
    </div>
  );
};
export default MainContent;
