import { StaticImageData } from "next/image";

export interface Promo {
  href: string;
  image: StaticImageData;
  data_title: string;
  subtitle: string;
}

export interface SubChild {
  href: string;
  label: string;
}

export interface Child {
  href: string;
  label: string;
  subChildren?: SubChild[];
}

export interface NavItem {
  href: string;
  label: string;
  data_title: string;
  children?: Child[];
  promos?: Promo[];
}

export interface ImageUnisexCollections {
  href: string;
  src: StaticImageData;
  data_title: string;
  subtitle: string;
  width: number;
  height: number;
}
export interface UnisexItem {
  href: string;
  label: string;
  image: ImageUnisexCollections[];
}

export interface ImageFeaturedBrands {
  href: string;
  src: StaticImageData;
  data_title: string;
  subtitle: string;
  width: number;
  height: number;
}
export interface FeatureBrands {
  href: string;
  label: string;
  image: ImageFeaturedBrands[];
}
export interface DataShopFavorite {
  href: string;
  src: StaticImageData;
  product_name: string;
  price: string;
  vendor: string;
  is_new: boolean;
}
export interface ShopFavorite {
  href: string;
  label: string;
  items: DataShopFavorite[];
}
