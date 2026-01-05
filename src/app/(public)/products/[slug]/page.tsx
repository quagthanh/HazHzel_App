import PublicProductDetailPage from "@/components/layout/public/public.detail.product";
import { getDetailProduct } from "@/services/product.api";
import { ListPageProps } from "@/types/interface";

const ProductDetailPage = async ({ params }: ListPageProps) => {
  const { slug } = params;
  const state = { color: "", size: "" };
  let productData: any = [];
  try {
    const res = await getDetailProduct(slug, state);
    if (res?.data?.data) {
      productData = res.data.data;
    }
  } catch (error) {
    console.error("Fetch detail product error:", error);
  }
  if (!productData) return <div>Product not found</div>;
  return <PublicProductDetailPage product={productData} />;
};
export default ProductDetailPage;
