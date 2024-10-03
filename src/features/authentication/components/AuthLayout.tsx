import { Box, styled } from "@mui/material";
import authBg from "../../../assets/icons/authBg.svg";
import authBgDark from "../../../assets/icons/authBg-dark.svg";
import { useColorMode } from "@myCash/hooks";

type Props = {
  rightComponent?: React.ReactNode;
  leftComponent: React.ReactNode;
};

const AuthLayout = ({ rightComponent, leftComponent }: Props) => {
  const { isLightMode } = useColorMode();
  return (
    <StyledBox
      sx={{
        backgroundImage: `url(${isLightMode ? authBg : authBgDark})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        gridTemplateColumns: rightComponent ? "1.125fr 1fr" : "1fr",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: {
            xs: "10rem 2rem",
            xl: "12rem 4rem",
          },
        }}
      >
        {leftComponent}
      </Box>
      {rightComponent && (
        <Box
          sx={{
            display: "flex",
            background: isLightMode ? "white" : "#404040",
            padding: {
              xs: "4rem 2rem",
              xl: "4rem 4rem",
            },
          }}
        >
          {rightComponent}
        </Box>
      )}
    </StyledBox>
  );
};

export default AuthLayout;

const StyledBox = styled("div")({
  display: "grid",
  minHeight: "100vh",
  position: "relative",
});
