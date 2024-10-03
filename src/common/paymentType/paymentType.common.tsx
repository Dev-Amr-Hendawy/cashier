import { ReactNode } from "react";
import { Stack } from "@mui/system";
import { StyledPaymentTypeContainer } from "./styles";
import { Typography } from "@mui/material";

// import { setPaymentType } from "@myCash/lib";
// import { useDispatch } from "react-redux";

type Props = {
  active?: boolean;
  title: string;
  icon?: ReactNode;
  PaymentType: number;
  iconImages?: string[];
  handleClick?: () => void;
  disabled?: boolean;
};

export const PaymentType: React.FC<Props> = ({
  active,
  title,
  icon,
  // PaymentType,
  iconImages,
  handleClick,
}) => {
  // const dispatch = useDispatch();
  const handlePaymentType = () => {
    // dispatch(setPaymentType(PaymentType));
    handleClick && handleClick();
  };
  return (
    <StyledPaymentTypeContainer alignItems="center" justifyContent="center" active={active} onClick={handlePaymentType}>
      {icon}
      {iconImages && (
        <Stack direction={"row"} gap={"4px"}>
          {iconImages.map((icon, index) => (
            <img key={index} src={icon} alt={title} style={{ width: "2rem", height: "2rem" }} />
          ))}
        </Stack>
      )}
      <Typography variant="h6">{title}</Typography>
    </StyledPaymentTypeContainer>
  );
};
