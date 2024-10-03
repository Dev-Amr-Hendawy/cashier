import { StyledOutlinedIcon } from "./styles";

interface OutlinedIconProps {
  icon: React.ReactNode;
}

export const OutlinedIcon: React.FC<OutlinedIconProps> = ({ icon }) => {
  return (
    <StyledOutlinedIcon
      height={"64px"}
      width={"64px"}
      border={"3px solid rgba(45, 45, 45, 0.05)"}
      borderRadius={"50%"}
    >
      {icon}
    </StyledOutlinedIcon>
  );
};
