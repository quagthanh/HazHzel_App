"use client";
import styles from "@/components/common/customer/shop-favorite/style.module.scss";
import oas1 from "@/../public/assets/oas1.webp";
import oas2 from "@/../public/assets/oas2.webp";
import oas3 from "@/../public/assets/oas3.webp";
import oas4 from "@/../public/assets/oas4.webp";

import { ShopFavorite } from "@/types/interface";
import CustomButton from "@/components/common/customer/public-button";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ShopFavorites = () => {
  const shopFavorite: ShopFavorite[] = [
    {
      href: "/collections/oas",
      label: "OAS COMPANY",
      items: [
        {
          href: "#",
          src: oas1,
          product_name: "kore studios",
          price: "167,45",
          vendor: "OAS",
          is_new: false,
          is_sale: true,
          is_hot: true,
        },
        {
          href: "#",
          src: oas2,
          product_name: "kore studios",
          price: "Euro Summer Vibes",
          vendor: "OAS",
          is_new: false,
          is_sale: true,
          is_hot: false,
        },
        {
          href: "#",
          src: oas3,
          product_name: "kore studios",
          price: "Euro Summer Vibes",
          vendor: "OAS",
          is_new: false,
          is_sale: true,
          is_hot: true,
        },
        {
          href: "#",
          src: oas4,
          product_name: "kore studios",
          price: "Euro Summer Vibes",
          vendor: "OAS",
          is_new: false,
          is_sale: true,
          is_hot: false,
        },
        {
          href: "#",
          src: oas1,
          product_name: "kore studios",
          price: "Euro Summer Vibes",
          vendor: "OAS",
          is_new: true,
          is_sale: true,
          is_hot: true,
        },
        {
          href: "#",
          src: oas2,
          product_name: "kore studios",
          price: "Euro Summer Vibes",
          vendor: "OAS",
          is_new: false,
          is_sale: false,
          is_hot: true,
        },
        {
          href: "#",
          src: oas3,
          product_name: "kore studios",
          price: "Euro Summer Vibes",
          vendor: "OAS",
          is_new: true,
          is_sale: true,
          is_hot: false,
        },
        {
          href: "#",
          src: oas4,
          product_name: "kore studios",
          price: "Euro Summer Vibes",
          vendor: "OAS",
          is_new: false,
          is_sale: false,
          is_hot: true,
        },
      ],
    },
  ];
  return (
    <section id="shop-favorites">
      <div className={styles.sectionSpacing}>
        <div className={styles.container}>
          <div className={styles.sectionStack}>
            {shopFavorite.map((shop, idx) => (
              <div
                key={`${shop.label}-${idx}`}
                className={styles.shopFavoriteCarousel}
              >
                <h1 className={styles.title}>{shop.label}</h1>
                <Swiper
                  modules={[Navigation, Pagination, Mousewheel]}
                  spaceBetween={20}
                  //view number of view current
                  slidesPerView={1}
                  //next to numer of group items
                  slidesPerGroup={4}
                  mousewheel={false}
                  navigation
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    700: { slidesPerView: 2 },
                    1001: { slidesPerView: 4 },
                  }}
                >
                  {shop.items.map((item, index) => (
                    <SwiperSlide key={`${item.product_name}-${index}`}>
                      <div className={styles.slide}>
                        <div className={styles.imageContainer}>
                          <div className={styles.badgeGroup}>
                            {/* new badge */}
                            {item.is_new === true && (
                              <span className={styles.badge}>NEW</span>
                            )}
                            {item.is_sale === true && (
                              <span className={styles.badge}>SALE</span>
                            )}
                            {item.is_hot === true && (
                              <span className={styles.badge}>HOT</span>
                            )}
                          </div>

                          <Image
                            src={item.src}
                            alt={item.product_name}
                            className={styles.slideImage}
                          />
                        </div>
                        <h3 className={styles.itemName}>{item.product_name}</h3>
                        <p className={styles.itemPrice}>{item.price}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className={styles.cardContent}>
                  <Link href={shop.href}>
                    <CustomButton>SHOP NOW</CustomButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ShopFavorites;
