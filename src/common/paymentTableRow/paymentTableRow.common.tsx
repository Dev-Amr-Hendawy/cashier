import { Stack, Typography } from "@mui/material";
import deleteItemImg from "../../assets/images/delete-cart-item.svg";
import { DeleteItemImg } from "../cartSingleItem/styles";
import { StyledPaymentTableRow } from "./styles";

interface PaymentTableRowProps {
  productName: string;
  quantity: number;
  price: number | null;
  priceAfterDiscount: number;
  discount: string;
  handleDeleteProduct?: (id: number) => void;
  id: number;
}

export const PaymentTableRow: React.FC<PaymentTableRowProps> = ({
  productName,
  quantity,
  price,
  priceAfterDiscount,
  discount,
  handleDeleteProduct,
  id,
}) => {
  return (
    <StyledPaymentTableRow>
      <Typography variant="h5" color="grey.900" textAlign="start">
        {productName}
      </Typography>
      <Typography variant="h5" color="grey.900" textAlign="center">
        {quantity}
      </Typography>
      <Typography variant="h5" color="grey.900" textAlign="center">
        {discount}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Stack>
          <Typography variant="h5" color="grey.900" textAlign="end">
            {priceAfterDiscount}
          </Typography>
          {handleDeleteProduct && priceAfterDiscount !== price && (
            <Typography
              variant="body2"
              color="grey.600"
              textAlign="end"
              sx={{ textDecoration: " line-through dotted 0.5px" }}
            >
              {price}
            </Typography>
          )}
        </Stack>
        {handleDeleteProduct && (
          <DeleteItemImg
            src={deleteItemImg}
            alt="delete-item"
            onClick={() => handleDeleteProduct(id)}
          />
        )}
      </Stack>
    </StyledPaymentTableRow>
  );
};
