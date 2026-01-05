"use client";

import { useState, useMemo } from "react";
import styles from "@/components/common/customer/detail-product-page/style.module.scss";
import ThumbnailList from "../thumbnail-list";
import ProductInfo from "../product-detail-info";
import { MainImage } from "../main-detail-image";
import { IProductDetail } from "@/types/interface";

const DetailPage = ({ product }: { product: IProductDetail }) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    if (product.variants && product.variants.length > 0) {
      const defaults: Record<string, string> = {};
      const firstVariant = product.variants[0].attributes;

      for (let i = 0; i < firstVariant.length; i++) {
        defaults[firstVariant[i].k] = firstVariant[i].v;
      }
      return defaults;
    }
    return {};
  });

  const uniqueAttributes = useMemo(() => {
    const options: Record<string, Set<string>> = {};
    product?.variants?.forEach((variant) => {
      variant?.attributes?.forEach((attr) => {
        if (!options[attr.k]) {
          options[attr.k] = new Set();
        }
        options[attr.k].add(attr.v);
      });
    });
    return Object.entries(options).map(([key, values]) => ({
      name: key,
      values: Array.from(values),
    }));
  }, [product]);
  const currentVariant = useMemo(() => {
    if (!product?.variants) return null;

    return (
      product.variants.find((v) =>
        v.attributes.every((attr) => selectedOptions[attr.k] === attr.v)
      ) || null
    );
  }, [selectedOptions, product]);

  const handleOptionChange = (key: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  const imagesToShow = useMemo(() => {
    if (currentVariant?.images && currentVariant.images.length > 0) {
      return currentVariant.images.map((img) => img.secure_url);
    }
    if (product?.images && product.images.length > 0) {
      return product.images.map((img) => img.secure_url);
    }
    return ["/placeholder.webp"];
  }, [currentVariant, product]);
  const isOptionAvailable = (attributeName: string, value: string): boolean => {
    const testSelection = { ...selectedOptions, [attributeName]: value };

    const matchingVariant = product.variants?.find((variant) =>
      variant.attributes.every((attr) => testSelection[attr.k] === attr.v)
    );
    return !!(matchingVariant && matchingVariant.stock > 0);
  };
  return (
    <div className={`${styles.productPage} ${styles.colorSchema}`}>
      <div className={styles.productGrid}>
        <ThumbnailList images={imagesToShow} />
        <MainImage images={imagesToShow} />
        <ProductInfo
          product={product}
          currentVariant={currentVariant}
          uniqueAttributes={uniqueAttributes}
          selectedOptions={selectedOptions}
          isOptionDisabled={(k, v) => !isOptionAvailable(k, v)}
          onOptionChange={handleOptionChange}
        />
      </div>
    </div>
  );
};

export default DetailPage;
