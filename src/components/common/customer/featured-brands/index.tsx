"use client";
import boston from "@/../public/assets/Boston_Clogs_in_Antique_White_test.jpg";
import maison from "@/../public/assets/Maison_Balzac_Olive_test.jpg";
import shirt from "@/../public/assets/shirt_test.jpg";
import styles from "@/components/common/customer/featured-brands/style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FeatureBrands } from "@/types/interface";
import CustomButton from "@/components/common/customer/public-button";
const FeaturedBrands = () => {
  const featuredBrands: FeatureBrands[] = [
    {
      href: "/collections/birkin",
      label: "Birkenstock",
      image: [
        {
          href: "#",
          src: boston,
          data_title: "kore studios",
          subtitle: "Euro Summer Vibes",
          width: 635,
          height: 672,
        },
      ],
    },
    {
      href: "/collections/kore-studio",
      label: "kore studios",
      image: [
        {
          href: "#",
          src: shirt,
          data_title: "kore studios",
          subtitle: "Euro Summer Vibes",
          width: 635,
          height: 672,
        },
      ],
    },
    {
      href: "/collections/masion-balzac",
      label: "Maison balzac",
      image: [
        {
          href: "#",
          src: maison,
          data_title: "kore studios",
          subtitle: "Euro Summer Vibes",
          width: 635,
          height: 672,
        },
      ],
    },
  ];
  return (
    <section id="featured-brands">
      <div className={styles.colorSchema}>
        <div className={styles.sectionStack}>
          <div className={`${styles.collectionListTextOutSide} ${styles.wrap}`}>
            {featuredBrands.map((brand, idx) => (
              <Link
                href={brand.href}
                key={`${brand.href}-${idx}`}
                className={styles.collectionCard}
              >
                <div className={styles.contentOverMedia}>
                  <Image
                    src={brand.image[0].src}
                    alt="img"
                    fill
                    className={styles.zoomImage}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{brand.label}</h3>
                  <CustomButton>SHOP</CustomButton>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturedBrands;
