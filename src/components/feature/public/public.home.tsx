"use client";

import FeaturedBrands from "@/components/common/customer/featured-brands";
import MarqueeText from "@/components/common/customer/marquee-text";
import ShopFavorites from "@/components/common/customer/shop-favorite";
import UnisexCollections from "@/components/common/customer/unisex-collections";

const PublicHomePage = () => {
  return (
    <>
      <MarqueeText />
      <UnisexCollections />
      <FeaturedBrands />
      <ShopFavorites />
    </>
  );
};

export default PublicHomePage;
