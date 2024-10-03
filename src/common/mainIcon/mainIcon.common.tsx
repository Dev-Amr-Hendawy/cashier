import React from "react";
import { StyledIconButton, StyledIconButtonSquare } from "./styles";

type Props = {
  icon: React.ReactNode;
  size?: "small" | "medium" | "large";
  bgColor?:
    | "white"
    | "primary"
    | "secondary"
    | "grey"
    | "transparent"
    | "common.black"
    | "common.white"|string;
  iconcolor?: "white" | "black" | "common.black" | "common.white"|string;
  shadow?:string;
  outlined?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export const MainIcon: React.FC<Props> = ({
  icon,
  size = "medium",
  bgColor = "white",
  iconcolor = "black",
  shadow,
  outlined = false,
  onClick,
  disabled = false,
}) => {
  return (
    <StyledIconButton
      size={size}
      bgcolor={bgColor}
      iconcolor={iconcolor}
      showBorder={outlined}
      shadow={shadow}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </StyledIconButton>
  );
};

export const MainIconSquare: React.FC<Props> = ({
  icon,
  size = "medium",
  bgColor = "white",
  iconcolor = "black",
  shadow,
  outlined = false,
  onClick,
  disabled = false,
}) => {
  return (
    <StyledIconButtonSquare
      size={size}
      bgcolor={bgColor}
      iconcolor={iconcolor}
      showBorder={outlined}
      shadow={shadow}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </StyledIconButtonSquare>
  );
};
