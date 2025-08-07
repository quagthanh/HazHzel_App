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
  is_sale: boolean;
  is_hot: boolean;
}
export interface ShopFavorite {
  href: string;
  label: string;
  items: DataShopFavorite[];
}
export interface INewBrand {
  src: StaticImageData;
  href: string;
  label: string;
  description: string;
}
export interface IProduct {
  id: number;
  name: string;
  slug?: string;
  image: string;
  soldOut?: boolean;
  category?: string;
  specificColor?: number;
}

export interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICancelButton {
  onClick: () => void;
  children: React.ReactNode;
}
export interface ICartItem {
  onChangeTable: boolean;
}
