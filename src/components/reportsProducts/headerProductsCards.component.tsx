import { Stack } from "@mui/material";
import { MainLayout, ReportSalesCard } from "@myCash/common";
import { Bag } from "iconsax-react";

interface HeaderProductsCardsProps {}

export const HeaderProductsCards: React.FC<HeaderProductsCardsProps> = () => {
  return (
    <MainLayout>
      <Stack direction={"row"} gap={"0.5rem"} width={"100%"}>
        <ReportSalesCard
          appendix={`3000`}
          icon={<Bag color="var(--secondary-main)" />}
          title="reports.totalProducts"
          value=""
          hideChip
        />
        <ReportSalesCard
          appendix={`3000`}
          icon={<Bag color="var(--secondary-main)" />}
          title="reports.recentProducts"
          value=""
          hideChip
        />
        <ReportSalesCard
          appendix={`3000`}
          icon={<Bag color="var(--secondary-main)" />}
          title="reports.soldProducts"
          value=""
          hideChip
        />
        <ReportSalesCard
          appendix={`3000`}
          icon={<Bag color="var(--secondary-main)" />}
          title="reports.returnedProducts"
          value=""
          hideChip
        />
      </Stack>
    </MainLayout>
  );
};
