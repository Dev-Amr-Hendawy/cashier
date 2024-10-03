import { Stack } from "@mui/material";
import { HeaderWithMoreIcon, IconLabelValueField } from "@myCash/common";
import {
  Clock,
  ReceiptDiscount,
  ReceiptText,
  TicketDiscount,
} from "iconsax-react";
import { useState } from "react";
import { TaxCardModal } from "@myCash/components";
import { t } from "i18next";

interface TaxReportCardProps {}

export const TaxReportCard: React.FC<TaxReportCardProps> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Stack className="container-grey-border tax-report-card" flex={1}>
      <Stack>
        <HeaderWithMoreIcon
          title={t("reports.taxReport")}
          onClick={() => setModalOpen(true)}
        />
      </Stack>
      <TaxCardModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      <Stack gap={"10px"} padding={"10px 1rem"}>
        <IconLabelValueField
          icon={<Clock color="var(--grey-900)" />}
          label={t("timing")}
          value="20:22 مساءاً"
        />
        <IconLabelValueField
          icon={<ReceiptText color="var(--grey-900)" />}
          label={t("reports.taxCard.totalSales")}
          value="0.0"
        />
        <IconLabelValueField
          icon={<ReceiptDiscount color="var(--grey-900)" />}
          label={t("reports.taxCard.totalSalesWithTax")}
          value="0.0"
        />
        <IconLabelValueField
          icon={<TicketDiscount color="var(--grey-900)" />}
          label={t("reports.taxCard.totalTax")}
          value="0.0"
        />
      </Stack>
    </Stack>
  );
};
