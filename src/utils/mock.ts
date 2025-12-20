import { statusProduct } from "@/types/enum";
import { IProduct } from "@/types/interface";

export const products: IProduct[] = [
  {
    _id: "1",
    name: "FORTUNE TELLER CARDIGAN",
    description: "Denim fabrication",
    slug: "fortune-teller-cardigan",
    views: 120,
    images: [
      {
        public_id: "fortune_1",
        secure_url:
          "https://res.cloudinary.com/diparg13r/image/upload/v1766038194/mono-store/k43fo0ue6xopcuzaoill.webp",
        width: 800,
        height: 1200,
      },
      {
        public_id: "fortune_2",
        secure_url:
          "https://res.cloudinary.com/diparg13r/image/upload/v1766071079/mono-store/zotsi3xckahxf6c96dsg.webp",
        width: 800,
        height: 1200,
      },
    ],
    categoryId: {
      _id: "cat1",
      name: "Knitwear",
      slug: "knitwear",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    supplierId: {
      _id: "sup1",
      name: "MR SIMPLE",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    status: statusProduct.ACTIVE,
    isHot: true,
    isSale: true,
    originalPrice: 20000,
    discountPrice: 3000,
    currentPrice: 17000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
