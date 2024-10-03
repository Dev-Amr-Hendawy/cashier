import { Skeleton, styled } from "@mui/material";

export const CategorySkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  width: theme.spacing(20),
  height: theme.spacing(10),
}));
