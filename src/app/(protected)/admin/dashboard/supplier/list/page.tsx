import ProductListClient from "@/components/common/admin/product/product-list/product.list";
import SupplierListClient from "@/components/common/admin/supplier/supllier-list";
import { getCategory } from "@/services/category.api";
import { getProductsForAdmin } from "@/services/product.api";
import { getSupplier, getSuppliersForAdmin } from "@/services/supplier.api";
import { AdminPageProps } from "@/types/product";
const SupplierListPage = async ({ searchParams }: AdminPageProps) => {
  const current = Number(searchParams?.current) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  let suppliers = [];
  // let categoryName: any = getCategory();
  // let supplierName: any = getSupplier();
  // const [resultCategoryName, resultSupplierName] = await Promise.allSettled([
  //   categoryName,
  //   supplierName,
  // ]);
  // if (resultCategoryName.status == "fulfilled") {
  //   const res = resultCategoryName.value;
  //   if (res?.data) {
  //     categoryName = res?.data?.data?.result;
  //   }
  // } else {
  //   console.error(
  //     "Error when fetch value of category :",
  //     resultCategoryName.reason,
  //   );
  // }
  // if (resultSupplierName.status == "fulfilled") {
  //   const res = resultSupplierName.value;
  //   if (res?.data) {
  //     supplierName = res?.data?.data?.result;
  //   }
  // } else {
  //   console.error(
  //     "Error when fetch value of supplier :",
  //     resultSupplierName.reason,
  //   );
  // }
  let meta = { current: 1, pageSize: 10, total: 0, pages: 0 };
  try {
    const res = await getSuppliersForAdmin({
      current,
      pageSize,
    });
    const backendData = res?.data?.data;
    console.log("Check backedData of supplier:", backendData);
    if (backendData) {
      suppliers = backendData.result || [];
      meta = backendData.meta || meta;
      console.log("Check supplier:", suppliers);
    } else {
      console.error(" API return 200 but can not find key 'data.data'");
    }
  } catch (error: any) {
    console.error("Error when call API Product:", error?.message);
  }

  return <SupplierListClient initialData={suppliers} initialMeta={meta} />;
};

export default SupplierListPage;
