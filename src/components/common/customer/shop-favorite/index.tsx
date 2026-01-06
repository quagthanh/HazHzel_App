"use client";

import styles from "@/components/common/customer/shop-favorite/style.module.scss";
import CustomButton from "@/components/common/customer/public-button";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { IProduct } from "@/types/interface";
import { formatPriceHelper } from "@/utils/helper";

interface ShopFavoritesProps {
  products?: IProduct[];
}

const ShopFavorites = ({ products = [] }: ShopFavoritesProps) => {
  if (!products || products.length === 0) return null;

  return (
    <section id="shop-favorites">
      <div className={styles.sectionSpacing}>
        <div className={styles.container}>
          <div className={styles.sectionStack}>
            <div className={styles.shopFavoriteCarousel}>
              <h1 className={styles.title}>NEW BRAND</h1>

              <Swiper
                modules={[Navigation, Pagination, Mousewheel]}
                spaceBetween={20}
                slidesPerView={1}
                slidesPerGroup={1}
                mousewheel={false}
                navigation
                breakpoints={{
                  640: { slidesPerView: 2, slidesPerGroup: 2 },
                  768: { slidesPerView: 3, slidesPerGroup: 3 },
                  1024: { slidesPerView: 4, slidesPerGroup: 4 },
                }}
              >
                {products.map((item) => (
                  <SwiperSlide key={item._id}>
                    <div className={styles.slide}>
                      <div className={styles.imageContainer}>
                        <div className={styles.badgeGroup}>
                          {item.isHot && (
                            <span className={styles.badge}>HOT</span>
                          )}
                          {item.isSale && (
                            <span className={styles.badge}>SALE</span>
                          )}
                        </div>

                        <Link href={`/products/${item.slug}`}>
                          <Image
                            src={
                              item.images?.[0]?.secure_url ||
                              "/placeholder.webp"
                            }
                            alt={item.name}
                            className={styles.slideImage}
                            width={300}
                            height={400}
                          />
                        </Link>
                      </div>

                      <h3 className={styles.itemName}>
                        <Link
                          href={`/products/${item.slug}`}
                          className={styles.link}
                        >
                          {item.name}
                        </Link>
                      </h3>

                      <div className={styles.priceGroup}>
                        {item.isSale ? (
                          <>
                            <span className={styles.itemPriceLineThrough}>
                              {formatPriceHelper(item.originalPrice)}
                            </span>
                            <span className={styles.itemPrice}>
                              {formatPriceHelper(item.currentPrice)}
                            </span>
                          </>
                        ) : (
                          <p className={styles.itemPrice}>
                            {formatPriceHelper(item.currentPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={styles.cardContent}>
                <Link href="/collections/all">
                  <CustomButton>VIEW ALL</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopFavorites;
