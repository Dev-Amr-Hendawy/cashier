export const discountMarker = (discountType: string) => {
  return discountType === "1" ? "ر.س" : discountType === "2" ? "%" : "";
};
