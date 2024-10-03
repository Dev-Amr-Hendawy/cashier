import { PaymentClient, PaymentTable, PaymentTableRow } from "@myCash/common";

import { CartState } from "@myCash/lib";
import { PaymentFullSummary } from "@myCash/components";
import { Stack } from "@mui/material";
import { calculateProductPayment } from "@myCash/utils";

// import { useDispatch, useSelector } from "react-redux";

type Props = {
  mainState: CartState;
  handleDeleteProduct: (id: number) => void;
  handleResetPayments: () => void;
};

export const PaymentMainInfo: React.FC<Props> = ({
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
            {mainState?.products?.map((product) => {
              if (mainState.products.length === 0) {
                handleResetPayments();
                // dispatch(resetPayments());
              }
              const {
                // totalProductPriceAfterDiscount,
                totalProductPrice,
                discountAmount,
                discountMarker,
                productsPriceAfterDiscount,
              } = calculateProductPayment(product);
              return (
                <PaymentTableRow
                  key={product.id}
                  productName={product.name}
                  quantity={product.cartQuantity}
                  priceAfterDiscount={productsPriceAfterDiscount}
                  price={totalProductPrice}
                  discount={
                    discountAmount ? discountAmount + discountMarker : "------"
                  }
                  handleDeleteProduct={handleDeleteProduct}
                  id={product.id}
                />
              );
            })}
          </PaymentTable>

          <PaymentFullSummary />
        </>
      )}
    </Stack>
  );
};
