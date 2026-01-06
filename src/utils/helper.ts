export const getParam = (
  param: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param;
};
export const formatPriceHelper = (price?: number) =>
  price
    ? new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price)
    : "Contact";
