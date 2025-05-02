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
