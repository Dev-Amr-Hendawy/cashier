import { Box, styled } from "@mui/material";
import bgSignup from "./../../../../assets/images/bgSignup.svg";
import "./styles.scss";
import StepperSignUp from "./StepperSignUp";
type Props = {
  rightComponent?: React.ReactNode;
  component?: React.ReactNode;
};

const AuthStepsLayout = ({ component ,rightComponent}: Props) => {

  return (
    <StyledBox>
      {/* Background image */}
      <Box 
      className="bg-sign-up"
        component="img"
        src={bgSignup}
        alt="bg sign up"
        
      />

      {/* Content */}
      <Box
       className="content-box"
      >
        <StepperSignUp />
        {rightComponent&&rightComponent}
        {component&&component}
      </Box>
    </StyledBox>
  );
};

export default AuthStepsLayout;

const StyledBox = styled("div")({
  display: "grid",
  minHeight: "100vh",
  position: "relative",
});
