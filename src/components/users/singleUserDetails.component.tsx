import { Stack, Typography } from "@mui/material";
import { IconLabelValueField, TableUserCell } from "@myCash/common";
import { RootState } from "@myCash/lib";
import { Call, Location, MedalStar, Profile, Shop, Sms } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface SingleUserDetailsProps {}

export const SingleUserDetails: React.FC<SingleUserDetailsProps> = () => {
  const { t } = useTranslation();
  const employee = useSelector((state: RootState) => state.employee);
  return (
    <Stack className="user-details-container">
      {/* user id */}
      <Stack className="container-border-padding  ">
        <IconLabelValueField
          icon={<Profile color="#2D2D2D" />}
          label={t("users.userId")}
          value={employee?.id || ""}
        />
      </Stack>
      {/* user data */}
      <Stack className="container-border-padding " gap={"0.75rem"}>
        <Typography variant="h4" mb={"4px"}>
          {employee?.name}
        </Typography>
        <IconLabelValueField
          icon={<MedalStar size={24} color="#2D2D2D" />}
          label={t("users.form.role")}
          value={
            <TableUserCell
              isCard={employee?.type == 1}
              value={employee?.type == 2 ? t("users.form.cashier") : ""}
            />
          }
        />
        <IconLabelValueField
          icon={<Call size={24} color="#2D2D2D" />}
          label={t("phone")}
          value={employee?.phone || ""}
        />
        <IconLabelValueField
          icon={<Sms size={24} color="#2D2D2D" />}
          label={t("email")}
          value={employee?.email || ""}
        />
      </Stack>
      {/* branch */}
      <Stack className="container-border-padding  ">
        <IconLabelValueField
          icon={<Shop color="#2D2D2D" />}
          label={t("branch")}
          value={employee?.mainBranch?.name || ""}
        />
      </Stack>
      {/* user address */}
      <Stack className="container-border-padding " gap={"0.75rem"}>
        <IconLabelValueField
          icon={<Location size="20" color="#2D2D2D" />}
          label={t("client.form.address")}
          value=""
        />
        <Typography variant="subtitle2" fontWeight={"600"} ml={"2.25rem"}>
          {employee?.mainBranch?.address || ""}
        </Typography>
      </Stack>
    </Stack>
  );
};
