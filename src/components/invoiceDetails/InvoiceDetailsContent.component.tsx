import "./styles.scss";

import { Box, Stack } from "@mui/material";
import {
  HeaderWithBack,
  Invoice,
  PaymentTable,
  PaymentTableRow,
  SmallContainer,
} from "@myCash/common";
import { InvoiceClientTitle, InvoicePaymentSummary } from "@myCash/components";

import Button from "../form/Button";
import { InvoiceType } from "@myCash/types";
import { RootState } from "@myCash/lib";
import { TickCircle } from "iconsax-react";
import { calculateProductPayment } from "@myCash/utils";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

type InvoiceDetailsContentProps = {
  invoice: InvoiceType;
};
export const InvoiceDetailsContent: React.FC<InvoiceDetailsContentProps> = ({
  invoice,
}) => {
  const { t } = useTranslation();
  const products = useSelector((state: RootState) => state.cart.products);

  return (
    <SmallContainer
      mainSide={
        // <ScrollContainer
        <>
          <HeaderWithBack title={t("invoice.details")} />
          <Stack className="invoice-details-container">
            <InvoiceClientTitle title={t("client.client")} />
            {/* <PaymentClient hideMenu roundedBorders /> */}
            {/* TODO:: add table here ya neemo */}
            <InvoiceClientTitle title={t("products")} />
            <PaymentTable>
              {products &&
                products.map((product) => {
                  const {
                    totalProductPriceAfterDiscount,
                    totalProductPrice,
                    discountAmount,
                    discountMarker,
                  } = calculateProductPayment(product);
                  return (
                    <PaymentTableRow
                      key={product.id}
                      productName={product.name}
                      quantity={product.cartQuantity}
                      priceAfterDiscount={totalProductPriceAfterDiscount}
                      price={totalProductPrice}
                      discount={discountAmount + discountMarker}
                      // handleDeleteProduct={handleDeleteProduct}
                      id={product.id}
                      // delete={false}
                    />
                  );
                })}
            </PaymentTable>
            <InvoicePaymentSummary />
            <Button
              text={t("invoice.confirmReturnInvoice")}
              startIcon={<TickCircle color={"#fff"} />}
              notRounded
            />
          </Stack>
        </>
      }
      aSide={
        <Box
          sx={{
            padding: "2rem 1rem",
          }}
        >
          <Invoice borderless invoice={invoice} />
        </Box>
      }
    />
  );
};
