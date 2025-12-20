"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Pagination, Spin } from "antd";

import TitleHeaderCenter from "@/components/common/customer/title-center";
import FilterBar from "@/components/common/customer/filter-bar";
import ProductGrid from "@/components/common/customer/product-grid";
import { getProducts } from "@/services/product.api";
import { IProduct } from "@/types/interface";

import styles from "@/components/layout/public/client-listing-layout/listing-store-layout/listing-store-layout.module.scss";

export default function ListingStoreClient({ title }: { title: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const current = Number(searchParams.get("current")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 12;

  const [products, setProducts] = useState<IProduct[]>([]);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts({ current, pageSize });
        setProducts(res.data.data.result);
        setMeta(res.data.data.meta);
      } catch (e) {
        console.error("Fetch products error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [current, pageSize]);

  const onPageChange = (page: number, size: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", page.toString());
    params.set("pageSize", size.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <TitleHeaderCenter title={title} />
      <FilterBar />

      <div className={styles.wrapper}>
        {loading ? (
          <div className={styles.loading}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <ProductGrid products={products} />

            <div className={styles.pagination}>
              <Pagination
                current={meta.current}
                pageSize={meta.pageSize}
                total={meta.total}
                onChange={onPageChange}
                showSizeChanger
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
