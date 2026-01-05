import { StaticImageData } from "next/image";
import { IProduct, IProductDetail, IProductVariant } from "../interface";

export interface ListingClientProps {
  banner: StaticImageData;
  title?: string;
  initialProducts: IProduct[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
  };
}
export enum GenderType {
  MEN = "MEN",
  WOMEN = "WOMEN",
  UNISEX = "UNISEX",
}
export interface ProductInfoProps {
  product: IProductDetail;
  currentVariant: IProductVariant | null;
  uniqueAttributes: { name: string; values: string[] }[];
  selectedOptions: Record<string, string>;
  onOptionChange: (k: string, v: string) => void;
}
