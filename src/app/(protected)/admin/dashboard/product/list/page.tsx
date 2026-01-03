import ProductListClient from "@/components/common/admin/product/product-list/product.list";
import { getProductsForAdmin } from "@/services/product.api";
import { auth } from "@/auth";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductListPage = async ({ searchParams }: PageProps) => {
  const session = await auth();
  const token = session?.user?.access_token;

  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  let products = [];
  let meta = { current: 1, pageSize: 10, total: 0, pages: 0 };
  try {
    const res = await getProductsForAdmin({
      current,
      pageSize,
      accessToken: token,
    });
    const backendData = res?.data?.data;

    if (backendData) {
      products = backendData.result || [];
      meta = backendData.meta || meta;
    } else {
      console.error(" API return 200 but can not find key 'data.data'");
    }
  } catch (error: any) {
    console.error("Error when call API Product:", error?.message);
  }

  return <ProductListClient initialData={products} initialMeta={meta} />;
};

export default ProductListPage;
