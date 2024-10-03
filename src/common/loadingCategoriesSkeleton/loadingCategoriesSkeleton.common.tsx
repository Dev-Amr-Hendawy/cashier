import { Stack } from "@mui/material";
import { CategorySkeleton } from "./styles";

export const LoadingCategoriesSkeleton: React.FC = () => {
  return (
    <Stack direction="row" spacing={2}>
      {[...Array(8)].map((_, index) => (
        <CategorySkeleton key={index} />
      ))}
    </Stack>
  );
};
