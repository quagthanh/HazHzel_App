"use client";

import AnnouncementBar from "@/components/common/customer/announcement-bar-carousel";
import FeaturedBrands from "@/components/common/customer/featured-brands";
import HeroPublic from "@/components/common/customer/hero";
import MarqueeText from "@/components/common/customer/marquee-text";
import NewBrand from "@/components/common/customer/new-brand";
import ShopFavorites from "@/components/common/customer/shop-favorite";
import UnisexCollections from "@/components/common/customer/unisex-collections";

const PublicHomePage = () => {
  return (
    <>
      <HeroPublic />
      <UnisexCollections />
      <MarqueeText />
      <FeaturedBrands />
      <ShopFavorites />
      <NewBrand />
    </>
  );
};

export default PublicHomePage;
