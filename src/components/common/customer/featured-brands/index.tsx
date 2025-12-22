"use client";

import { useEffect, useState } from "react";
import styles from "@/components/common/customer/featured-brands/style.module.scss";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "@/components/common/customer/public-button";
import { getTopSuppliers } from "@/services/supplier.api";
import { TopSupplier } from "@/types/interface";
import AppImage from "@/components/common/image/image";

const FeaturedBrands = () => {
  const [brands, setBrands] = useState<TopSupplier[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopSuppliers = async () => {
      setLoading(true);
      try {
        const res = await getTopSuppliers();
        setBrands(res.data.data);
      } catch (error) {
        console.error("Fetch top suppliers error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSuppliers();
  }, []);

  if (loading) return null;

  return (
    <section id="featured-brands">
      <div className={styles.colorSchema}>
        <div className={styles.sectionStack}>
          <div className={`${styles.collectionListTextOutSide} ${styles.wrap}`}>
            {brands.map((item) => {
              const supplier = item.supplier;
              const image = supplier.images?.[0];

              return (
                <Link
                  href={`/stores/${item.supplier.slug}`}
                  key={item.supplierId}
                  className={styles.collectionCard}
                >
                  <div className={styles.contentOverMedia}>
                    <AppImage
                      src={image?.secure_url || "/placeholder.webp"}
                      alt={supplier.name}
                      className={styles.zoomImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <h3>{supplier.name}</h3>
                    <CustomButton>SHOP</CustomButton>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
