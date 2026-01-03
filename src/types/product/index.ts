import { StaticImageData } from "next/image";
import { IProduct } from "../interface";

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
