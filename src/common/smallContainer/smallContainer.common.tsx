import { Grid } from "@mui/material";

type SmallContainerProps = {
  reverse?: boolean;
  mainSide: React.ReactNode;
  aSide: React.ReactNode;
  calculator?: boolean;
};

export const SmallContainer: React.FC<SmallContainerProps> = ({ reverse, mainSide, aSide, calculator }) => {
  return (
    <Grid
      container
      columns={100}
      sx={{
        height: "calc(100vh - 5.5rem)",
        overflowY: "auto",
      }}
    >
      <Grid item xs={calculator ? 74 : 66} order={reverse ? 2 : 1}>
        {mainSide}
      </Grid>
      <Grid item xs={calculator ? 26 : 34} order={reverse ? 1 : 2}>
        {aSide}
      </Grid>
    </Grid>
  );
};
