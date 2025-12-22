"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";
import styles from "@/components/common/image/image.module.scss";

interface AppImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string;
  alt?: string;
  className?: string;
}

const AppImage = ({ src, alt = "", className, ...props }: AppImageProps) => {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return <div className={styles.fallback} />;
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
      {!loaded && <div className={styles.skeleton} />}

      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default AppImage;
