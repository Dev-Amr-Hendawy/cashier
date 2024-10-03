import { Stack, Typography } from "@mui/material";
import { HeaderWithBack, HeaderWithMoreIcon } from "@myCash/common";
import { useTranslation } from "react-i18next";
import successIcon from "../../assets/icons/success-icon.svg";
import { StyledSuccessBox } from "./styles";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

export const PaymentDetailsHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      <HeaderWithBack
        title={t("process")}
        handleClose={() => {
          navigate("/");
        }}
      />
      <Stack>
        <StyledSuccessBox>
          <img src={successIcon} alt="success" />
          <Stack spacing={0.5}>
            <Typography variant="h4">{t("payment.success")}</Typography>
            <Typography variant="h6" color="grey.600">
              {t("payment.success-message")}
            </Typography>
          </Stack>
        </StyledSuccessBox>
        <div className="header-more-payment">
          <HeaderWithMoreIcon title={t("payment.summary")} hideMore />
        </div>
        {/* <StyledSummaryHeaderContainer>
          <Typography variant={"h4"} color="grey.900">
            {t("payment.summary")}
          </Typography>
          <Box
            sx={{
              transform: "rotate(90deg)",
            }}
          >
            <More variant="Outline" color="#2D2D2D" />
          </Box>
        </StyledSummaryHeaderContainer> */}
      </Stack>
    </Stack>
  );
};
