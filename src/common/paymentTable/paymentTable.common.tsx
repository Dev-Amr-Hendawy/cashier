import { Divider } from "@mui/material";
import { PaymentTableContainer } from "./styles";
import { PaymentTableHeader } from "..";

interface PaymentTableProps {
  children: React.ReactNode;
}

export const PaymentTable: React.FC<PaymentTableProps> = ({ children }) => {
  return (
    <PaymentTableContainer divider={<Divider />} spacing={0.5}>
      <PaymentTableHeader />
      {children}
    </PaymentTableContainer>
  );
};
