import { Box, Stack, Typography } from "@mui/material";
import { BranchDetailsAppendix, IconLabelValueField } from "@myCash/common";
import { RootState } from "@myCash/lib";
import { Call, Location, Medal, Shop } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface SingleBranchDetailsProps {}

export const SingleBranchDetails: React.FC<SingleBranchDetailsProps> = () => {
  const { t } = useTranslation();
  const branch = useSelector((state: RootState) => state.branch);
  return (
    <Stack className="user-details-container">
      {/* branch id */}
      <Stack className="container-border-padding  ">
        <IconLabelValueField
          icon={<Shop color="var(--grey-900)" />}
          label={t("branches.userId")}
          value={branch?.id || ""}
        />
      </Stack>
      {/* branch data */}
      <Stack>
        <Stack className="branch-data-container" gap={"0.75rem"}>
          <Typography variant="h4" mb={"4px"}>
            {branch?.name || ""}
          </Typography>
          <IconLabelValueField
            icon={<Call size={24} color="var(--grey-900)" />}
            label={t("phone")}
            value={branch?.phone || ""}
          />
          <IconLabelValueField
            icon={<Location size={24} color="var(--grey-900)" />}
            label={t("branches.form.address")}
            value={branch?.address || ""}
          />
          <Box className={branch?.isMain ? "branch-main" : ""}>
            <IconLabelValueField
              icon={<Medal size={24} color="var(--grey-900)" />}
              label={t("status")}
              value={
                branch?.isMain
                  ? t("default")
                  : branch?.status === 1
                  ? t("active")
                  : t("inactive")
              }
            />
          </Box>
        </Stack>
        <BranchDetailsAppendix isActive={branch?.status === 1} />
      </Stack>

      {/* branch address */}
      <Stack className="container-border-padding" gap={"0.75rem"}>
        <IconLabelValueField
          icon={<Location size="20" color="#6EC531" />}
          label={t("client.form.address")}
        />
        <Typography variant="subtitle2" fontWeight={"600"} ml={"2.25rem"}>
          {branch?.address || ""}
        </Typography>
      </Stack>
    </Stack>
  );
};
