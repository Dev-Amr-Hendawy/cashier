import { Stack, Typography } from "@mui/material";
import { IconLabelValueField } from "@myCash/common";
import { formatMoney } from "@myCash/utils";
// import { Coin, Coin1, MoneySend, ReceiptItem } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface ReportsReturnedDetailsProps {
  totalReturnedAmount: number|null;
  invoicesReturnedCount: number | null;
}
export const ReportsReturnedDetails: React.FC<ReportsReturnedDetailsProps> = ({
  totalReturnedAmount,
  invoicesReturnedCount,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="report-details-container">
         <Typography variant="h5">{t("reports.returnInvoicesSummary")}</Typography>
      <Stack className="container-border-padding" bgcolor={'var(--primary-primary50)'} border={"none"} sx={{".icon-label-value-container":{
         color:"var(--text-color)"
      }}} >
        <Stack gap={"0.5rem"}>
          <IconLabelValueField
            label={t("reports.invoicesCount")}
            // icon={<MoneySend color="#2D2D2D" />}
            value={invoicesReturnedCount&&invoicesReturnedCount!==0?invoicesReturnedCount: 0}

          />
          <IconLabelValueField
            label={t("totalReturn")}
            // icon={<Coin1 color="#2D2D2D" />}
            value={totalReturnedAmount?formatMoney(`${totalReturnedAmount}`): 0}
          />
        
        </Stack>
      </Stack>
    
    </Stack>
  );
};
