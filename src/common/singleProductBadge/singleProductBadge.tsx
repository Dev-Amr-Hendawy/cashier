import { Typography } from "@mui/material";
import { StyledSingleProductBadge } from "./styles";

export interface SingleProductBadgeProps {
  backgroundColor: string;
  label: string;
  icon: React.ReactNode;
}

export const SingleProductBadge: React.FC<SingleProductBadgeProps> = (
  props
) => {
  return (
    <StyledSingleProductBadge {...props}>
      {props.icon}
      <Typography variant="h6">{props.label}</Typography>
    </StyledSingleProductBadge>
  );
};
