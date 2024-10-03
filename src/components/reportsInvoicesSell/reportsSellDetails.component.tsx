import { Stack, Typography } from "@mui/material";
import { IconLabelValueField } from "@myCash/common";
import { TotalIconLabelValueField } from "@myCash/common/totalIconLabelValue";
import { formatMoney } from "@myCash/utils";
// import { Coin, Coin1, MoneySend, ReceiptItem } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface ReportsSellDetailsProps {
  data: {
    total_price: number | null;
    total_tax: number | null;
    total_without_tax: number | null;
  };
  invoicesSellCount: number | null;
}
export const ReportsSellDetails: React.FC<ReportsSellDetailsProps> = ({
  data,
  invoicesSellCount,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="report-details-container">
         <Typography variant="h5">{t("reports.summaryTitle")}</Typography>
      <Stack className="container-border-padding" bgcolor={'var(--primary-primary50)'} border={"none"} sx={{".icon-label-value-container":{
         color:"var(--text-color)"
      }}} >
        <Stack gap={"0.5rem"}>
          <IconLabelValueField
            label={t("reports.invoicesCount")}
            // icon={<MoneySend color="#2D2D2D" />}
            value={invoicesSellCount&&invoicesSellCount!==0?invoicesSellCount: 0}

          />
          <IconLabelValueField
            label={t("totalTax")}
            // icon={<Coin1 color="#2D2D2D" />}
            value={data?.total_tax?formatMoney(`${data?.total_tax}`): 0}
          />
          <IconLabelValueField
            label={t("totalWithoutTax")}
            // icon={<Coin color="#2D2D2D" />}
            value={data?.total_without_tax?formatMoney(`${data?.total_without_tax}`): 0 }
          />
        </Stack>
      </Stack>
      <Stack
        className="container-border-padding"
        bgcolor={"var(--primary-main)"}
        sx={{
          ".MuiTypography-root":{
            fontSize:"1rem"
          }
        }}
      >
        <TotalIconLabelValueField
          label={t("total")}
          // icon={<ReceiptItem color="var(--grey-0)" size={24} />}
          value={data?.total_price?formatMoney(`${data?.total_price}`): 0 }
          // valueAppendix={t("currency")}
        />
      </Stack>
    </Stack>
  );
};
