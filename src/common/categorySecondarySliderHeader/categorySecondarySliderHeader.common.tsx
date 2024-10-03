import { Stack, Typography } from "@mui/material";
import { ArrowLeft } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../lib";
import { StyledIconButton } from "./styles";

type CategorySecondarySliderHeaderProps = {
  title?: string;
  handleBack?: () => void;
};

export const CategorySecondarySliderHeader: React.FC<CategorySecondarySliderHeaderProps> = ({ title, handleBack }) => {
  const { t } = useTranslation();
  const catState = useSelector((state: RootState) => state.category);

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ padding: "1rem" }}>
      <Typography variant="h5" color="grey.900">
        {title || t("categories.title")}
      </Typography>
      <StyledIconButton
        disabled={!catState?.singleCategoryId}
        onClick={handleBack}
        sx={{ opacity: !catState?.singleCategoryId ? 0 : 1 }}
      >
        <ArrowLeft variant="TwoTone" />
      </StyledIconButton>
    </Stack>
  );
};
