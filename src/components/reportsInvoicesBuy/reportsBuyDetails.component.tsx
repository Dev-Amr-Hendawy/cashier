import { Stack } from "@mui/material";
import { IconLabelValueField } from "@myCash/common";
import { TotalIconLabelValueField } from "@myCash/common/totalIconLabelValue";
import { Coin, Coin1, MoneySend, ReceiptItem } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface ReportsBuyDetailsProps {
  data: {
    total_price: number | null;
    total_tax: number | null;
    total_without_tax: number | null;
  };
  invoicesBuyCount: number | null;
}
export const ReportsBuyDetails: React.FC<ReportsBuyDetailsProps> = ({
  data,
  invoicesBuyCount,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="report-details-container">
      <Stack className="container-border-padding">
        <Stack gap={"0.5rem"}>
          <IconLabelValueField
            label={t("reports.invoicesCount")}
            icon={<MoneySend color="#2D2D2D" />}
            value={invoicesBuyCount || ""}
          />
          <IconLabelValueField
            label={t("totalTax")}
            icon={<Coin1 color="#2D2D2D" />}
            value={data?.total_tax || ""}
          />
          <IconLabelValueField
            label={t("totalWithoutTax")}
            icon={<Coin color="#2D2D2D" />}
            value={data?.total_without_tax || ""}
          />
        </Stack>
      </Stack>
      <Stack
        className="container-border-padding"
        bgcolor={"var(--secondary-main)"}
      >
        <TotalIconLabelValueField
          label={t("total")}
          icon={<ReceiptItem color="var(--grey-0)" size={24} />}
          value={data?.total_price || ""}
          valueAppendix={t("currency")}
        />
      </Stack>
    </Stack>
  );
};
