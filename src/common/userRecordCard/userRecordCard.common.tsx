import { Stack, Typography } from "@mui/material";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { IconLabelValueField } from "..";
import { Calendar, MoneySend, Shop } from "iconsax-react";
import Button from "@myCash/components/form/Button";

interface UserRecordCardProps {
  onClick?: () => void;
}

export const UserRecordCard: React.FC<UserRecordCardProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Stack className="user-record-card">
      <Stack className="user-record-content">
        <Typography variant="h5">{t("users.userActivities")}</Typography>
        <Stack gap={"0.5rem"}>
          <IconLabelValueField
            label={t("date")}
            icon={<Calendar size={18} />}
            value="11"
          />
          <IconLabelValueField
            label={t("branch")}
            icon={<Shop size={18} />}
            value="11"
          />
          <IconLabelValueField
            label={t("client.totalSales")}
            icon={<MoneySend size={18} />}
            value="11"
          />
        </Stack>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        text={t("users.showDetails")}
        onClick={onClick}
      />
    </Stack>
  );
};
