import AnnouncementBarCasoul from "@/components/common/customer/announcement-bar-carousel";
import MarqueeText from "@/components/common/customer/marquee-text";
import NavBar from "@/components/common/customer/public-header";
import Link from "next/link";

const PublicHeader = () => {
  return (
    <>
      <AnnouncementBarCasoul />
      <NavBar />
    </>
  );
};
export default PublicHeader;
