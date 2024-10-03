import { Grid } from "@mui/material";
import React from "react";

interface PaymentLayoutProps {
  // children: React.ReactNode;
  mainSide: React.ReactNode;
  aside: React.ReactNode;
}

export const PaymentLayout: React.FC<PaymentLayoutProps> = ({
  mainSide,
  aside,
}) => {
  return (
    // <StyledPaymentContainer>
    <Grid container columns={12}>
      <Grid item xs={3} sx={{ overflowY: "auto", height: "90vh",backgroundColor:'var(--grey-500)',  }} >
        {aside}
      </Grid>
      <Grid
        item
        xs={9}
        sx={{
          overflowY: "auto",
          height: "calc(100vh - 5.5rem)",
          p:2
        }}
      >
        {mainSide}
      </Grid>
    </Grid>

    // </StyledPaymentContainer>
  );
};

{
  /* <Box
        sx={{
          gridColumn: "1 / span 3",
          width: "100%",
          height: "100%",
        }}
      >
        {aside}
      </Box>
      <Box
        sx={{
          gridColumn: "4 / span 9",
          width: "100%",
          height: "calc(100vh - 100px)",
          overflowY: "auto",
        }}
      >
        {mainSide}
      </Box> */
}
