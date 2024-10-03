import { Typography } from "@mui/material";
import { StyledTextFieldIconLabel } from "./styles";

interface TextFieldIconLabelProps {
  icon: React.ReactNode;
  label: string;
}

export const TextFieldIconLabel: React.FC<TextFieldIconLabelProps> = ({
  icon,
  label,
}) => {
  return (
    <StyledTextFieldIconLabel direction={"row"}>
      {icon}
      <Typography variant="h6">{label}</Typography>
    </StyledTextFieldIconLabel>
  );
};
