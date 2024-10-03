import { Stack } from "@mui/material";
import { MainLayout,  ReportSalesCard } from "@myCash/common";
import { useGetReportsSales } from "@myCash/hooks";
import { RootState } from "@myCash/lib";
import { Card,  EmptyWalletTime,  ReceiptMinus, WalletMoney } from "iconsax-react";
import { useSelector } from "react-redux";
//  Chart,
interface HeaderSalesCardsProps {branch_id:string}

export const HeaderSalesCards: React.FC<HeaderSalesCardsProps> = ({branch_id}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const today = new Date();
  const formattedDate = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
  

  const {   data ,isPending, isRefetching} =
    useGetReportsSales({ date_from:user?.created_at? user?.created_at:'2024-01-01',
      date_to: formattedDate,
      type: "",
      sort: "",
      branch_id:branch_id,
    });
    const totalReports = data?.pages[0][0]; 



  if (
    !data?.pages[0] ||
    (data?.pages[0].length === 0 && !isPending && !isRefetching)
  )
    return ;

  return (
    <MainLayout>
      <Stack direction={"row"} gap={"0.5rem"} width={"100%"}>
      <ReportSalesCard
          appendix={totalReports.total_sales_with_out_tax}
          icon={<ReceiptMinus color="var(--primary-main)" />}
          title="reports.totalSalesWithOutTax"
          value=""
          hideChip
        />
        <ReportSalesCard
          appendix={totalReports.total_sales_with_tax}
          icon={<ReceiptMinus color="var(--primary-main)" />}
          title="reports.totalSalesWithTax"
          value=""
          hideChip
        />
        <ReportSalesCard
          appendix={totalReports.total_cash}
          icon={<WalletMoney color="var(--primary-main)" />}
          title="reports.totalCash"
          value=""
          hideChip
        />
        <ReportSalesCard
          appendix={totalReports.total_visa}
          icon={<Card color="var(--primary-main)" />}
          title="reports.totalVisa"
          value=""
          hideChip
        />
        <ReportSalesCard
          appendix={totalReports.total_remaining}
          icon={<EmptyWalletTime color="var(--primary-main)" />}
          title="reports.totalCredit"
          value=""
          hideChip
        />
      </Stack>
    

    </MainLayout>
  );
};
