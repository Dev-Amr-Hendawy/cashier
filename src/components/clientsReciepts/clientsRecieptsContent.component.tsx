import {
  CartLogo,
  StyledRightSideContainer,
} from "@myCash/common/cartContainer/styles";
import {
  ClientRecieptDetails,
  ClientsRecieptsHeader,
  ClientsRecieptsSettings,
  ClientsRecieptsSlider,
  ReceiptsView,
} from "@myCash/components";
import { HomeLayout, ScrollContainer } from "@myCash/common";
import { Stack, Typography } from "@mui/material";

import { RootState } from "@myCash/lib";
import { StyledPadding } from "../salesInvoices/styles";
import cartLogo from "../../assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useColorMode } from "@myCash/hooks";

interface ClientsRecieptsContentProps {}

export const ClientsRecieptsContent: React.FC<
  ClientsRecieptsContentProps
> = () => {
  const { t } = useTranslation();
  const receiptState = useSelector((state: RootState) => state.receipt);
  const { isLightMode } = useColorMode();
  return (
    <HomeLayout
      leftSide={
        <ScrollContainer>
          <Stack>
            <StyledPadding>
              <Typography variant="h4">{t("receipt.title")}</Typography>
            </StyledPadding>
            <ClientsRecieptsHeader />
            <ClientsRecieptsSlider />
            <ReceiptsView />
          </Stack>
        </ScrollContainer>
      }
      rightSide={
        <Stack>
          <ClientsRecieptsSettings />

          <StyledRightSideContainer>
            {receiptState.receipt_id ? (
              <Stack>
                <ClientRecieptDetails />
              </Stack>
            ) : (
              <CartLogo
                src={isLightMode ? cartLogo : cartLogoDark}
                alt="cart-logo"
              />
            )}
          </StyledRightSideContainer>
        </Stack>
      }
    />
  );
};
