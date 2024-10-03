import { Box, styled } from "@mui/material";
import React from "react";
// import lightLogo from "../../../assets/images/auth-logo.svg";
// import darkLogo from "../../../assets/images/auth-logo-dark.svg";
// import { useColorMode } from "@myCash/hooks/custom/useColorMode.hook";

type Props = {
  children: React.ReactNode;
  showLogo?: boolean;
};

const AuthFormLayoutNew = ({ children,  }: Props) => {
  // const { isLightMode } = useColorMode();
  return (
    <StyledContainer>
 
      <Box
        sx={{
          width: "clamp(25rem, 50vw, 70rem)",
        }}
      >
        {children}
      </Box>
    </StyledContainer>
  );
};

export default AuthFormLayoutNew;

const StyledContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  alignItems: "center",
  padding: " 4rem 1.5rem",
  "& form": {
    width: "100%",
  },
}));
