import { Stack, Typography } from "@mui/material";
import { IconLabelValueField } from "..";
import { Shop, TickCircle } from "iconsax-react";
import { Branch } from "@myCash/types";
import "./styles.scss";
import { useTranslation } from "react-i18next";

interface BranchGridCardProps {
  onClick?: (branch: Branch) => void;
  branch: Branch;
}

export const BranchGridCard: React.FC<BranchGridCardProps> = ({
  branch,
  onClick,
}) => {
  const { t } = useTranslation();
  const isMain = branch.isMain === 1;
  return (
    <Stack
      className="container-border-padding branch-grid-card "
      onClick={() => onClick && onClick(branch)}
    >
      <IconLabelValueField
        label={isMain ? t("branch") : t("branches.aBranch")}
        fixedLabelValue={isMain ? t("branches.main") : branch.name || ""}
        icon={
          isMain ? (
            <TickCircle size="24" color="#6EC531" variant="Bold" />
          ) : (
            <Shop size="24" color="#2D2D2DCC" />
          )
        }
      />
      <Stack className="branch-card-content">
        {/* address */}
        <Typography variant="h6">{branch.address || ""}</Typography>
        {/* phone */}
        <Typography variant="subtitle2">{branch.phone || ""}</Typography>
        {/* is default */}
        <Typography variant="subtitle2" color={"#232773"} mt={"0.5rem"}>
          {isMain ? t("default") : ""}
        </Typography>
      </Stack>
    </Stack>
  );
};
