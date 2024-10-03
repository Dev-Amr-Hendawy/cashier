import { useTranslation } from "react-i18next";
import { ScrollContainer } from "@myCash/common";
import { Stack, Typography } from "@mui/material";
import {
  InvoicesNotificationsSlider,
  InvoicesNotificationsView,
} from "@myCash/components";

import { StyledPadding } from "./styles";
import { InvoicesNotificationsHeader } from "./invoicesNotificationsHeader.component";

interface ClientsInvoicesContentProps {}

export const InvoicesNotificationsContent: React.FC<
  ClientsInvoicesContentProps
> = () => {
  const { t } = useTranslation();
  // const invoicesState = useSelector((state: RootState) => state.invoices);
  // const { client_id } = useParams();
  // const { isLightMode } = useColorMode();
  return (
    // <HomeLayout
    // leftSide={
    <ScrollContainer>
      <Stack>
        <StyledPadding>
          <Typography variant="h4">{t("invoicesNotifications")}</Typography>
        </StyledPadding>
        <InvoicesNotificationsHeader />
        <InvoicesNotificationsSlider />
        <InvoicesNotificationsView />
      </Stack>
    </ScrollContainer>
    // }
    //   rightSide={
    //     <Stack>
    //       <InvoicesNotificationsSettings />
    //       <StyledRightSideContainer>
    //         {invoicesState.invoice_id ? (
    //           <SingleInvoiceWithActions invoice_id={invoicesState.invoice_id} />
    //         ) : (
    //           <CartLogo
    //             src={isLightMode ? cartLogo : cartLogoDark}
    //             alt="cart-logo"
    //           />
    //         )}
    //       </StyledRightSideContainer>
    //     </Stack>
    //   }
    // />
  );
};
