import PublicProductDetailPage from "@/components/layout/public/public.detail.product";
const products = [
  {
    id: 1,
    name: "Sunglasses",
    slug: "sung-glasses",
    collections: "MR SIMPLE",
    category: "Mon Renn",
    image: "/glasses.jpg",
    soldOut: true,
    specificColor: 180310,
    p1: "something very special",
    p2: "FORTUNE TELLER CARDIGAN",
    description: "- DENIM FABRICATION",
  },
];
const ProductPage = () => {
  return <PublicProductDetailPage></PublicProductDetailPage>;
};
export default ProductPage;
