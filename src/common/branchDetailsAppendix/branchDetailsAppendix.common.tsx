import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { TickCircle } from "iconsax-react";

interface BranchDetailsAppendixProps {
  isActive: boolean;
}

export const BranchDetailsAppendix: React.FC<BranchDetailsAppendixProps> = ({
  isActive,
}) => {
  const { t } = useTranslation();
  return (
    <Stack
      className="branch-details-appendix"
      bgcolor={isActive ? "#6EC531" : "#2d2d2d0d"}
    >
      {isActive && (
        <>
          <TickCircle size="16" color="#fff" />
          <Typography color={isActive ? "#fff" : ""}>
            {isActive && t("active")}
          </Typography>
        </>
      )}
    </Stack>
  );
};
