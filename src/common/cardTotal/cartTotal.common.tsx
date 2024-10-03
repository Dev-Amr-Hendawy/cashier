import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledContainer } from "./styles";
import { memo } from "react";

type CartTotalProps = {
  total: string;
};

const CartTotalCommon: React.FC<CartTotalProps> = ({ total }) => {
  const { t } = useTranslation();
  return (
    <StyledContainer>
      <Typography variant="h3" color="grey.900">
        {t("invoice.total")}
      </Typography>
      <Typography variant="h3" color="primary">
        {total}{" "}
      </Typography>
    </StyledContainer>
  );
};

export const CartTotal = memo(CartTotalCommon);
