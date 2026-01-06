"use client";
import AnnouncementBarCasoul from "@/components/common/customer/announcement-bar-carousel";
import NavBar from "@/components/common/customer/public-header";
import { announcements, navItems } from "@/shared/configs/header";

const PublicHeader = () => {
  return (
    <>
      <AnnouncementBarCasoul messages={announcements} />
      <NavBar items={navItems} />
    </>
  );
};
export default PublicHeader;
