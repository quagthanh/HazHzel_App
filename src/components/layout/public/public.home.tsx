import FeaturedBrands from "@/components/common/customer/featured-brands";
import HeroPublic from "@/components/common/customer/hero";
import MarqueeText from "@/components/common/customer/marquee-text";
import NewBrand from "@/components/common/customer/new-brand";
import ShopFavorites from "@/components/common/customer/shop-favorite";
import UnisexCollections from "@/components/common/customer/unisex-collections";
import { getHomeProductBySupplier } from "@/services/product.api";
import { getTopSuppliers } from "@/services/supplier.api";

const PublicHomePage = async () => {
  let topSuppliers: any = [];
  let productSuppliers: any = [];
  const topSuppliersData = getTopSuppliers();
  const homeProductsData = getHomeProductBySupplier();
  const [resultTopSupplier, resultProductSuppliers] = await Promise.allSettled([
    topSuppliersData,
    homeProductsData,
  ]);
  if (resultTopSupplier.status === "fulfilled") {
    const res1 = resultTopSupplier.value;
    if (res1?.data) {
      topSuppliers = res1.data || [];
    }
  } else {
    console.error(
      `Error when fetch top suppliers : ${resultTopSupplier.reason}`,
    );
  }
  if (resultProductSuppliers.status === "fulfilled") {
    const res = resultProductSuppliers.value;

    if (res?.data) {
      productSuppliers = res?.data?.result || [];
    }
  } else {
    console.error(
      `Error fetching home products:${resultProductSuppliers.reason}`,
    );
  }
  return (
    <>
      <HeroPublic />
      <UnisexCollections />
      <MarqueeText />
      <FeaturedBrands brands={topSuppliers} />
      <ShopFavorites products={productSuppliers} />
      <NewBrand />
    </>
  );
};

export default PublicHomePage;
