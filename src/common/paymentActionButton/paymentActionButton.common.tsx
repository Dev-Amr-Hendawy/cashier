import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { StyledPaymentActionButton } from "./styles";

interface PaymentActionButtonProps {
  title: string;
  icon: ReactNode;
  bcgColor: string;
  onClick: () => void;
  loading?: boolean;
}

export const PaymentActionButton: React.FC<PaymentActionButtonProps> = ({
  title,
  icon,
  bcgColor,
  onClick,
  loading = false,
}) => {
  return (
    <StyledPaymentActionButton
      onClick={onClick}
      bcgColor={bcgColor}
      disabled={loading}
    >
      {icon}
      <Typography variant="h6">{title}</Typography>
    </StyledPaymentActionButton>
  );
};
