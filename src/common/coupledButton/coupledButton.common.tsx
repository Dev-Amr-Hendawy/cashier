import { StyledCoupledButton } from "./styles";

interface CoupledButtonProps {
  title?: string | React.ReactNode;
  isFocused?: boolean;
  handleFocus?: () => void;
  icon?: React.ReactNode;
  openModal?: () => void;
  disabled?: boolean;
  textColor?: "grey" | "primary" | "secondary";
  isErrors?: boolean;
}
export const CoupledButton: React.FC<CoupledButtonProps> = ({
  title,
  icon,
  isFocused,
  handleFocus,
  openModal,
  disabled = false,
  textColor,
  isErrors,
}) => {
  const handleClick = () => {
    handleFocus && handleFocus();
    openModal && openModal();
  };
  return (
    <StyledCoupledButton
      variant="outlined"
      startIcon={icon}
      isFocused={isFocused}
      onClick={handleClick}
      disabled={disabled}
      textColor={textColor}
      isErrors={isErrors}
    >
      {title}
    </StyledCoupledButton>
  );
};
