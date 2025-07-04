"use client";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
const formatTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.toUpperCase())
    .join(" ");
};
const BreadcrumbPublic = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  let breadcrumbItems = [
    {
      title: "HOME",
      href: "/",
    },

    {
      title: "SHOP",
      href: "/collections/",
    },
  ];
  if (pathSegments.length >= 2 && pathSegments[0] === "collections") {
    const categorySlug = pathSegments[1];
    breadcrumbItems.push({
      title: formatTitle(categorySlug),
      href: `/collections/${categorySlug}`,
    });
  }
  return <Breadcrumb style={{ fontSize: "0.7rem" }} items={breadcrumbItems} />;
};
export default BreadcrumbPublic;
