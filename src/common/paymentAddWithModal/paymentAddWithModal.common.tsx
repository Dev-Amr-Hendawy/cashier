import { Typography } from "@mui/material";
import { StyledButtonAddWithModalContainer } from "./styles";
import { AddCircle } from "iconsax-react";

interface PaymentAddWithModalProps {
  title: string;
  onClick: () => void;
}

export const PaymentAddWithModal: React.FC<PaymentAddWithModalProps> = ({
  title,
  onClick,
}) => {
  return (
    <StyledButtonAddWithModalContainer
      alignItems="center"
      justifyContent="center"
      onClick={onClick}
    >
      <AddCircle size="32" variant="Bold" />
      <Typography variant="h6">{title}</Typography>
    </StyledButtonAddWithModalContainer>
  );
};
