import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { StyledInvoiceTypeContainer } from "./styles";
import { useDispatch } from "react-redux";
import {
  setInvoiceTaxType,
  setInvoiceType,
} from "../../lib/store/slices/cart-slice";

type Props = {
  active?: boolean;
  title: string;
  logo: ReactNode;
  invoiceType: number;
  isSellOrBuy?: boolean;
};

export const InvoiceType: React.FC<Props> = ({
  active,
  title,
  logo,
  invoiceType,
  isSellOrBuy,
}) => {
  const dispatch = useDispatch();
  const handleChooseInvoice = () => {
    isSellOrBuy
      ? dispatch(setInvoiceType(invoiceType))
      : dispatch(setInvoiceTaxType(invoiceType));
  };
  return (
    <StyledInvoiceTypeContainer
      alignItems="center"
      justifyContent="center"
      active={active}
      onClick={handleChooseInvoice}
    >
      {logo}
      <Typography variant="h6">{title}</Typography>
    </StyledInvoiceTypeContainer>
  );
};
