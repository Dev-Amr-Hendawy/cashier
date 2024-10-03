// import { useTranslation } from "react-i18next";
import { InvoicesLayout, ScrollContainer } from "@myCash/common";
import cartLogo from "../../assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import { useColorMode, useCustomPrint } from "@myCash/hooks";
import { InvoicesNotificationsSlider } from "./invoicesNotificationsSlider.component";
import { InvoicesNotificationDetailsView } from "./invoicesNotificationDetailsView.component";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { CartLogo, StyledRightSideContainer } from "@myCash/common/cartContainer/styles";

import { NotificationDetailsWithActions } from "../notificationDetailsWithActions";

import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import NewBackButton from "../ui/NewBackButton";

interface ClientsInvoicesContentProps { }

export const InvoicesNotificationDetailsContent: React.FC<
  ClientsInvoicesContentProps
> = () => {
  const invoicesState = useSelector(
    (state: RootState) => state.invoicesNotifications
  );
  // const { client_id } = useParams();
  const { isLightMode } = useColorMode();
  const { handlePrint, printerRef } = useCustomPrint()
  const navigate = useNavigate();
  return (
    <InvoicesLayout
      leftSide={
        <ScrollContainer>
          <InvoicesNotificationsSlider />
          <InvoicesNotificationDetailsView />
        </ScrollContainer>
      }
      rightSide={
        <Stack>
          <Stack width={200} ml="auto">
            <NewBackButton
              position="relative"
              onClick={() => {
                navigate(-1);
              }}
            /></Stack>
          {invoicesState.invoice_id ? (<>
            <NotificationDetailsWithActions
              invoice_id={invoicesState.invoice_id}
              printerRef={printerRef}
              handlePrint={handlePrint}
            />
          </>
          ) : (<StyledRightSideContainer>
            <CartLogo
              src={isLightMode ? cartLogo : cartLogoDark}
              alt="cart-logo"
            /></StyledRightSideContainer>
          )}
        </Stack>
      }
    />
  );
};
