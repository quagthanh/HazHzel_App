// import CartItem from "@/components/common/customer/list-cart-item";
// import { getCartByUserId } from "@/services/cart.api";
// import { AdminPageProps } from "@/types/product";

// const PublicCartTestPage = async ({ searchParams }: AdminPageProps) => {
//   const current = Number(searchParams?.current) || 1;
//   const pageSize = Number(searchParams?.pageSize) || 10;

//   let cartItems = [];
//   let meta = { current: 1, pageSize: 10, total: 0, pages: 0 };

//   try {
//     const res = await getCartByUserId({
//       current,
//       pageSize,
//     });

//     const backendData = res?.data;

//     if (backendData) {
//       cartItems = backendData.result || [];
//       meta = backendData.meta || meta;
//     } else {
//       console.error(
//         "getCartByUserId API return 200 but cannot find key where data is",
//       );
//     }
//   } catch (error: any) {
//     console.error("Error when call API Category:", error?.message);
//   }

//   return <CartItem initialCartItem={cartItems} />;
// };
// export default PublicCartTestPage;
