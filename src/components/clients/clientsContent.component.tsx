import {
  CartLogo,
  StyledRightSideContainer,
} from "@myCash/common/cartContainer/styles";
import {
  ClientsHeader,
  ClientsHeaderSlider,
  ClientsSettings,
  ClientsView,
  SingleClientDetails,
  SingleClientInvoicesCards,
  SingleClientRecieptsCards,
} from "@myCash/components";
import { HomeLayout, ScrollContainer } from "@myCash/common";
import { Stack, Typography } from "@mui/material";

import Fading from "../ui/animation/Fading";
import { RootState } from "@myCash/lib";
import { StyledPadding } from "../salesInvoices/styles";
import cartLogo from "@myCash/assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useColorMode } from "@myCash/hooks";

interface ClientsContentProps {}

export const ClientsContent: React.FC<ClientsContentProps> = () => {
  const { t } = useTranslation();
  const client = useSelector((state: RootState) => state.client);
  const { isLightMode } = useColorMode();
  return (
    <HomeLayout
      leftSide={
        <ScrollContainer>
          <Stack>
            <StyledPadding>
              <Typography variant="h4">{t("client.title")}</Typography>
            </StyledPadding>
            <ClientsHeader />
            <ClientsHeaderSlider />
            <ClientsView />
          </Stack>
        </ScrollContainer>
      }
      rightSide={
        <Stack>
          <ClientsSettings />
          <StyledRightSideContainer>
            {!client.client_id ? (
              <CartLogo
                src={isLightMode ? cartLogo : cartLogoDark}
                alt="cart-logo"
              />
            ) : (
              <Fading>
                <SingleClientDetails />
                <SingleClientInvoicesCards />
                <SingleClientRecieptsCards />
              </Fading>
            )}
          </StyledRightSideContainer>
        </Stack>
      }
    />
  );
};
