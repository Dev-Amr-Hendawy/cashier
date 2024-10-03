import { PaymentActionButton, PaymentLayout } from "@myCash/common";
import { TickCircle, Trash } from "iconsax-react";

import { Box } from "@mui/material";
import { QuickInvoiceActions } from "./quickInvoiceActions.component";
import { QuickInvoiceCalculator } from "./quickInvoiceCalculator.component";
import { QuickInvoiceMainInfo } from "./quickInvoiceMainInfo.component";
import { QuickInvoiceTypesButtons } from "./quickInvoiceTypesButtons.component";
import { StyledMainSide } from "../payment/styles";
import { RootState, quickInvoiceState } from "@myCash/lib";
import { useMakeQuickInvoice } from "@myCash/hooks";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

type Props = {
  quickInvoiceState: quickInvoiceState;
  handleDeleteProduct: (id: number) => void;
  handleResetPayments: () => void;
};

export const QuickInvoiceContent: React.FC<Props> = ({
  handleDeleteProduct,
  handleResetPayments,
  quickInvoiceState,
}) => {
  const { t } = useTranslation();
  const { handleInvoiceValuesBeforeSubmit, makeInvoiceMutation } =
    useMakeQuickInvoice();
  const { paymentType } = useSelector((state: RootState) => state.quickInvoice);

  return (
    <PaymentLayout
      mainSide={
        <StyledMainSide>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              gridColumn: "1/7",
              gridRow: "1/2",
            }}
          >
            <QuickInvoiceTypesButtons />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              gridColumn: "6/7",
              gridRow: "2/10",
            }}
          >
            <QuickInvoiceActions>
              <PaymentActionButton
                title={t("payment.delete-all")}
                onClick={() => {
                  handleResetPayments();
                }}
                icon={<Trash size="32" />}
                bcgColor="#2D2D2D99"
              />
              <PaymentActionButton
                title={t("confirm")}
                onClick={() => {
                  handleInvoiceValuesBeforeSubmit();
                }}
                icon={<TickCircle size="32" />}
                bcgColor="#232773"
                loading={makeInvoiceMutation.isPending}
              />
            </QuickInvoiceActions>
          </Box>
          <QuickInvoiceMainInfo
            mainState={quickInvoiceState}
            handleDeleteProduct={handleDeleteProduct}
            handleResetPayments={handleResetPayments}
          />
        </StyledMainSide>
      }
      aside={paymentType !== 2 && <QuickInvoiceCalculator />}
    />
  );
};
