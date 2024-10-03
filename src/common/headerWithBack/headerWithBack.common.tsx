import { Typography } from "@mui/material";
import BackButton from "@myCash/components/ui/BackButton";
import { StyledModalHeader } from "./styles";

interface HeaderWithBackProps {
  title: string;
  handleClose?: () => void;
  hideBackButton?: boolean;
}

export const HeaderWithBack: React.FC<HeaderWithBackProps> = ({
  title,
  handleClose,
  hideBackButton,
}) => {
  return (
    <StyledModalHeader
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography variant={"h4"} color="grey.900">
        {title}
      </Typography>
      {!hideBackButton && (
        <BackButton position="relative" onClick={handleClose} />
      )}
    </StyledModalHeader>
  );
};
