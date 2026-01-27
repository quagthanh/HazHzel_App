"use client";

import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  console.log("Top loader call");
  return (
    <NextTopLoader
      color="rgba(23, 127, 73, 1)"
      height={3}
      showSpinner={false}
      crawlSpeed={200}
      zIndex={1600}
      speed={300}
    />
  );
}
