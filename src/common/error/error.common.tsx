import { CloseCircle } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";

import headerLogo from "../../assets/images/header-logo.svg";

import { StyledContainer, StyledHeader, StyledLogo } from "../header/styles";

import "./styles.scss";

interface ErrorProps {}

export const Error: React.FC<ErrorProps> = () => {
  const { t } = useTranslation();
  return (
    <Stack className="error-container">
      <StyledHeader position="relative">
        <StyledContainer maxWidth={false}>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <StyledLogo src={headerLogo} alt="header-logo" />
          </Stack>
        </StyledContainer>
      </StyledHeader>
      <Stack className="error-component">
        <CloseCircle size={90} color="#E83E00" />
        <Stack gap={"1rem"}>
          <Typography variant="h2" color={"#2D2D2D"}>
            {t("error")}
          </Typography>
          <Typography variant="h6" color={"#2D2D2D99"}>
            {t("support")}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
