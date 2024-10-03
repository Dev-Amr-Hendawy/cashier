import { Grid, Stack } from "@mui/material";
import { AsideTitle, SalesCard } from "@myCash/common";

interface SingleBranchSalesProps {}

export const SingleBranchSales: React.FC<SingleBranchSalesProps> = () => {
  return (
    <Stack className="detail-container">
      <AsideTitle title="client.totalSales" />
      <Grid container className="details-cards-grid" spacing={1} columnSpacing={2}>
        <Grid item xs={6}>
          <SalesCard title="users.day" value="20" />
        </Grid>
        <Grid item xs={6}>
          <SalesCard title="users.sinceWeek" value="200" />
        </Grid>
        <Grid item xs={6}>
          <SalesCard title="users.sinceMonth" value="2000" />
        </Grid>
        <Grid item xs={6}>
          <SalesCard title="users.sinceYear" value="5000" />
        </Grid>
      </Grid>
    </Stack>
  );
};
