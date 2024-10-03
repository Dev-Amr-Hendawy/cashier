import { Stack } from "@mui/material";
import { MainLayout, ReportsArrowedCard } from "@myCash/common";

interface ReportsHeaderSectionProps {}

export const ReportsHeaderSection: React.FC<ReportsHeaderSectionProps> = () => {
  return (
    <MainLayout>
      <Stack direction={"row"} gap={"1rem"}>
        {/* reports cards arrow */}
        {/* <Stack gap={"0.5rem"} flex={1}> */}
        {/* <Stack direction={"row"} gap={"0.5rem"}> */}
        <ReportsArrowedCard
          title="reports.headerCards.credit"
          value="2500"
          hasCurrencyTag
        />
        <ReportsArrowedCard title="reports.headerCards.clients" value="200" />
        {/* </Stack> */}
        {/* <Stack direction={"row"} gap={"0.5rem"}> */}
        <ReportsArrowedCard
          title="reports.headerCards.sales"
          value="2550000"
          hasCurrencyTag
        />
        <ReportsArrowedCard
          title="reports.headerCards.returns"
          value="2500"
          hasCurrencyTag
        />
        {/* </Stack> */}
      </Stack>
      {/* <TaxReportCard /> */}
      {/* </Stack> */}
    </MainLayout>
  );
};
