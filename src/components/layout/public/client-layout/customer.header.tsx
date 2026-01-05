"use client";
import AnnouncementBarCasoul from "@/components/common/customer/announcement-bar-carousel";
import NavBar from "@/components/common/customer/public-header";
import imgRains from "@/../public/assets/exam.jpg";
import imgCariuma from "@/../public/assets/test6.png";

const PublicHeader = () => {
  const announcements = [
    "extra 30% off sale | code EXTRA30",
    "free shipping on all orders over $99",
    "New Arrivals are here! Shop now.",
  ];

  const navItems = [
    {
      label: "Men",
      href: "products?gender=MEN",
      childrenColumns: [
        {
          title: "Clothing",
          links: [
            { label: "Jeans", href: "/categories/jeans" },
            { label: "Jackets", href: "/categories/jackets" },
            { label: "Knitwear", href: "/categories/knitwear" },
            { label: "Pants", href: "/categories/pants" },
            { label: "Shirts", href: "/categories/shirts" },
            { label: "Shorts", href: "/categories/shorts" },
            { label: "Sweats", href: "/categories/sweats" },
            { label: "Tees", href: "/categories/tees" },
          ],
        },
        {
          title: "Accessories",
          links: [
            { label: "Perfumes", href: "/categories/perfumes" },
            { label: "Sunglasses", href: "/categories/sunglasses" },
            { label: "Sneakers", href: "/categories/sneakers" },
          ],
        },
        {
          title: "Sale",
          links: [{ label: "Sale", href: "/" }],
        },
      ],
      promos: [
        {
          image: imgRains,
          store: "RAINS",
          title: "SPRING ARRIVALS",
          href: "/collections/rains",
        },
        {
          image: imgCariuma,
          store: "CARIUMA",
          title: "NEW ARRIVALS",
          href: "/collections/cariuma",
        },
      ],
    },
    {
      label: "Women",
      href: "/women",
      childrenColumns: [
        {
          title: "Clothing",
          links: [
            { label: "Dresses", href: "/categories/dresses" },
            { label: "Jackets", href: "/categories/jackets" },
            { label: "Jeans", href: "/categories/jeans" },
            { label: "Knitwear", href: "/categories/knitwear" },
            { label: "Pants", href: "/categories/pants" },
            { label: "Shirts", href: "/categories/shirts" },
            { label: "Skirts", href: "/categories/skirts" },
            { label: "Shorts", href: "/categories/shorts" },
            { label: "Sweats", href: "/categories/sweats" },
            { label: "Tanks", href: "/categories/tanks" },
          ],
        },
        {
          title: "Accessories",
          links: [
            { label: "Jewellery", href: "/categories/jewellery" },
            { label: "Perfumes", href: "/categories/perfumes" },
            { label: "Sneakers", href: "/categories/sneakers" },
            { label: "Sunglasses", href: "/categories/sunglasses" },
          ],
        },
        {
          title: "Sale",
          links: [{ label: "Sale", href: "/sale" }],
        },
      ],
      promos: [
        {
          image: imgRains,
          store: "RAINS",
          title: "SPRING ARRIVALS",
          href: "/collections/rains",
        },
        {
          image: imgCariuma,
          store: "CARIUMA",
          title: "NEW ARRIVALS",
          href: "/collections/cariuma",
        },
      ],
    },
    { label: "collections", href: "/collections" },
    { label: "Sale", href: "/sale" },
  ];

  return (
    <>
      <AnnouncementBarCasoul messages={announcements} />
      <NavBar items={navItems} />
    </>
  );
};
export default PublicHeader;
