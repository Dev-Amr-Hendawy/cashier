import { useTranslation } from "react-i18next";
import { Calendar, MoneySend, Shop } from "iconsax-react";
import { ButtonBase, Stack, Typography } from "@mui/material";
import {
  CommonModal,
  IconLabelValueField,
  ShiftInfoCard,
} from "@myCash/common";
import "./styles.scss";

interface RecordDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  totalSales: string;
}

export const RecordDetailsModal: React.FC<RecordDetailsModalProps> = ({
  open,
  handleClose,
  totalSales,
}) => {
  const { t } = useTranslation();
  return (
    <CommonModal
      open={open}
      handleClose={handleClose}
      title="users.userRecord"
      hasActions={false}
    >
      <Stack gap={".75rem"}>
        {/* user info */}
        <Stack className="container-border-padding " gap={"0.75rem"}>
          <Typography variant="h4" mb={"4px"}>
            سعود الغمري
          </Typography>
          <IconLabelValueField
            label={t("branch")}
            icon={<Shop size={24} />}
            value="11"
          />
          <IconLabelValueField
            label={t("date")}
            icon={<Calendar size={24} />}
            value="11"
          />
          <IconLabelValueField
            label={t("client.totalSales")}
            icon={<MoneySend size={24} />}
            value="11"
          />
        </Stack>
        {/* start shift info */}
        <ShiftInfoCard type="start" />
        {/* end shift info */}
        <ShiftInfoCard type="end" />
        {/* total sales */}
        <ButtonBase className="record-total-sales" onClick={handleClose}>
          <Typography variant="h5">{t("client.totalSales")}</Typography>
          <Typography variant="h5">
            {totalSales} {t("currency")}
          </Typography>
        </ButtonBase>
      </Stack>
    </CommonModal>
  );
};
