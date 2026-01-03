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
          title: "MENSWEAR",
          links: [
            { label: "Barney Cools", href: "/stores/barney-cools" },
            { label: "Birkenstock", href: "/stores/birken-stock" },
            { label: "Kore Studios", href: "/stores/kore-studios" },
            { label: "Mr Simple", href: "/stores/mr-simple" },
            { label: "Nudie Jeans", href: "/stores/nudie-jeans" },
            { label: "OAS", href: "/stores/oas" },
            { label: "Seva Mont", href: "/stores/seva-mont" },
          ],
        },
        {
          title: "WOMENSWEAR",
          links: [
            { label: "Arcaa", href: "/stores/arcaa" },
            { label: "Elka Collective", href: "/stores/elka" },
            { label: "Friend of Audrey", href: "/stores/audrey" },
            { label: "iff", href: "/stores/iff" },
            { label: "Kinga Csilla", href: "/stores/kinga" },
            { label: "Mon Renn", href: "/stores/mon-renn" },
          ],
        },
        {
          title: "WOMENSqWEAR",
          links: [
            { label: "Arcaa", href: "/stores/arcaa" },
            { label: "Elka Collective", href: "/stores/elka" },
            { label: "Friend of Audrey", href: "/stores/audrey" },
            { label: "iff", href: "/stores/iff" },
            { label: "Kinga Csilla", href: "/stores/kinga" },
            { label: "Mon Renn", href: "/stores/mon-renn" },
          ],
        },
        {
          title: "WOMENSWEAR",
          links: [
            { label: "Arcaa", href: "/stores/arcaa" },
            { label: "Elka Collective", href: "/stores/elka" },
            { label: "Friend of Audrey", href: "/stores/audrey" },
            { label: "iff", href: "/stores/iff" },
            { label: "Kinga Csilla", href: "/stores/kinga" },
            { label: "Mon Renn", href: "/stores/mon-renn" },
          ],
        },
        {
          title: "WOMENSWEAR",
          links: [
            { label: "Arcaa", href: "/store/arcaa" },
            { label: "Elka Collective", href: "/store/elka" },
            { label: "Friend of Audrey", href: "/store/audrey" },
            { label: "iff", href: "/store/iff" },
            { label: "Kinga Csilla", href: "/store/kinga" },
            { label: "Mon Renn", href: "/store/mon-renn" },
          ],
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
          title: "CLOTHING",
          links: [{ label: "Dresses", href: "/dresses" }],
        },
      ],
    },
    { label: "stores", href: "/stores" },
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
