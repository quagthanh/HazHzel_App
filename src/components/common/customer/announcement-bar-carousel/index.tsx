"use client";

import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import styles from "@/components/common/customer/announcement-bar-carousel/style.module.scss";

const AnnouncementBar = () => {
  const carouselRef = useRef<any>(null);
  const handlePrev = () => {
    carouselRef.current?.prev();
    console.log("prev", carouselRef.current?.prev());
  };
  const handleNext = () => {
    carouselRef.current?.next();
    console.log("next", carouselRef.current?.next());
  };
  const announcements = [
    "extra 30% off sale | code EXTRA30",
    "free shipping on all orders over $99",
  ];
  return (
    <div className={styles.announcementBar}>
      <button onClick={handlePrev} className={styles.navButton}>
        <LeftOutlined />
      </button>

      <Carousel
        autoplay
        autoplaySpeed={5000}
        dots={false}
        effect="fade"
        ref={carouselRef}
        className={styles.carousel}
      >
        {announcements.map((msg, index) => (
          <div key={index}>
            <p className={styles.carouselText}>{msg}</p>
          </div>
        ))}
      </Carousel>

      <button onClick={handleNext} className={styles.navButton}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default AnnouncementBar;
