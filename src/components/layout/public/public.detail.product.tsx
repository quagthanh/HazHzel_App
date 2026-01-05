"use client";

import DetailPage from "@/components/common/customer/detail-product-page";
import { IProductDetail } from "@/types/interface";

const PublicProductDetailPage = ({ product }: { product: IProductDetail }) => {
  return <DetailPage product={product} />;
};
export default PublicProductDetailPage;
