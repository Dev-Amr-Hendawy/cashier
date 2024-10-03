import { PaymentClient, PaymentTable, PaymentTableRow } from "@myCash/common";

import { QuickInvoiceSummary } from "./quickInvoiceSummary.component";
import { Stack } from "@mui/material";
import { quickInvoiceState } from "@myCash/lib";

// import { useDispatch, useSelector } from "react-redux";

type Props = {
  mainState: quickInvoiceState;
  handleDeleteProduct: (id: number) => void;
  handleResetPayments: () => void;
};

export const QuickInvoiceMainInfo: React.FC<Props> = ({
  mainState,
  handleDeleteProduct,
  handleResetPayments,
}) => {
  // const cartState = useSelector((state: RootState) => state.cart);
  // const dispatch = useDispatch();
  // const handleDeleteProduct = (id: number) => {
  //   dispatch(deleteProduct(id));
  // };

  return (
    <Stack
      sx={{
        gridColumn: "1 / 6",
        gridRow: "2/ 10",
        marginTop: ".5rem",
      }}
    >
      {mainState.invoice_client && (
        <PaymentClient hideMenu client={mainState.invoice_client} />
      )}
      {mainState?.products.length > 0 && (
        <>
          <PaymentTable>
            {mainState?.products?.map((product, index) => {
              if (mainState.products.length === 0) {
                handleResetPayments();
                // dispatch(resetPayments());
              }

              return (
                <PaymentTableRow
                  key={index}
                  productName={product.name}
                  quantity={Number(product.quantity)}
                  priceAfterDiscount={Number(product.price)}
                  price={Number(product.price)}
                  discount={"------"}
                  handleDeleteProduct={handleDeleteProduct}
                  id={index}
                />
              );
            })}
          </PaymentTable>
        </>
      )}
      <QuickInvoiceSummary />
    </Stack>
  );
};
