import { Typography } from "@mui/material";
import { StyledCartSummaryItem } from "./styles";

type Props = {
  title: string;
  quantity: string;
};

export const CartSummaryItem: React.FC<Props> = ({ title, quantity }) => {
  return (
    <StyledCartSummaryItem direction="row">
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h5">{quantity}</Typography>
    </StyledCartSummaryItem>
  );
};
