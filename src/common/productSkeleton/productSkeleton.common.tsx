import { Skeleton } from "@mui/material";

export const ProductSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={"100%"}
      animation="wave"
      height={230}
      sx={{ borderRadius: "2rem" }}
    />
  );
};
