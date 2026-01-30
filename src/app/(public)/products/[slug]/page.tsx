import { auth } from "@/auth";
import PublicProductDetailPage from "@/components/layout/public/client-detail-product/public.detail.product";
import { getDetailProduct } from "@/services/product.api";
import { ListPageProps } from "@/types/interface";

const ProductDetailPage = async ({ params }: ListPageProps) => {
  const session = await auth();
  const userId = session?.user?._id || "Dont have userId at productdetailpage";
  const { slug } = params;
  const state = { color: "", size: "" };
  let productData: any = [];
  try {
    const res = await getDetailProduct(slug, state);
    console.log("Product detail res:", res.data);
    if (res?.data?.data) {
      productData = res.data.data;
    }
  } catch (error) {
    console.error("Fetch detail product error:", error);
  }
  if (!productData) return <div>Product not found</div>;
  return <PublicProductDetailPage product={productData} userId={userId} />;
};
export default ProductDetailPage;
