"use client";

import { useState, useMemo } from "react";
import styles from "@/components/common/customer/detail-product-page/style.module.scss";
import ThumbnailList from "../thumbnail-list";
import ProductInfo from "../product-detail-info";
import { MainImage } from "../main-detail-image";
import { IProductDetail } from "@/types/interface";
import { message } from "antd";
import { addToCart } from "@/services/cart.api";
import { isMissingUserId } from "@/constants";

const DetailPage = ({
  product,
  userId,
}: {
  product: IProductDetail;
  userId: string;
}) => {
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
        v.attributes.every((attr) => selectedOptions[attr.k] === attr.v),
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
      variant.attributes.every((attr) => testSelection[attr.k] === attr.v),
    );
    return !!(matchingVariant && matchingVariant.stock > 0);
  };
  const handleAddToCart = async (variantId: string, quantity: number) => {
    if (!userId || userId == isMissingUserId) {
      message.warning("Please login to add items to cart");
      // router.push('/login');
      return;
    }

    try {
      await addToCart({
        userId,
        payload: {
          items: [
            {
              productId: product._id,
              variantId,
              quantity,
            },
          ],
        },
      });
      message.success("Added to cart successfully!");
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Failed to add to cart");
    }
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
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default DetailPage;
