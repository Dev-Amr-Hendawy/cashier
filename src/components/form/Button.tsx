import { Button as MuiButton, styled, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

type ButtonProps = {
  text: string|ReactNode;
  variant?: "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClick?: () => void;
  loading?: boolean;
  width?: string;
  startIcon?: ReactNode;
  maxWidth?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  notRounded?: boolean;
  ref?:React.MutableRefObject<HTMLButtonElement | null>;
  fontWeight?:string;
  sx?: object;
  
};

const Button = ({
  text,
  variant = "contained",
  onClick,
  loading = false,
  disabled = false,
  color = "primary",
  width,
  startIcon,
  maxWidth,
  type = "button",
  notRounded = false,
  ref,
  fontWeight,sx
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      variant={variant}
      disabled={loading || disabled}
      color={color}
      disableElevation
      width={width}
      maxWidth={maxWidth}
      startIcon={startIcon}
      ref={ref}
      notRounded={notRounded}
      fontWeight={fontWeight}
      sx={sx}
    >
      {loading ? <CircularProgress size={24} /> : text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled(MuiButton, {
  shouldForwardProp(propName) {
    return (
      propName !== "width" &&
      propName !== "maxWidth" &&
      propName !== "notRounded"
    );
  },
})<{
  width?: string;
  maxWidth?: string;
  notRounded?: boolean;
  fontWeight?:string;
  sx?:object;
}>(({ theme, width, maxWidth, color, notRounded,fontWeight,sx }) => ({sx,
  maxWidth: maxWidth || "unset",
  width: width || "100%",
  height: "3.5rem",
  fontSize: "1rem",
  borderRadius: notRounded ? "0px" : "100rem",
  color: color,
fontWeight:fontWeight?fontWeight:"700",
  //breakpoints
  [theme.breakpoints.down("lg")]: {
    height: "3.75rem",
  },
  [theme.breakpoints.down("md")]: {
    height: "4rem",
  }
}));
