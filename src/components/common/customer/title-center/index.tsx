"use client";

import { usePathname } from "next/navigation";
import BreadcrumbPublic from "../breadcrumb";
import styles from "@/components/common/customer/title-center/style.module.scss";
const TitleHeaderCenter = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const title = pathSegments[1].toUpperCase() || "Page";
  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumb}>
        <BreadcrumbPublic />
      </div>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
export default TitleHeaderCenter;
