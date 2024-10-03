import { Stack, Typography } from "@mui/material";
import { TextFieldIconLabel } from "../../common";
import { Shop } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../lib";

interface ShiftBranchInfoProps {}

export const ShiftBranchInfo: React.FC<ShiftBranchInfoProps> = () => {
  const { t } = useTranslation();
  const branch = useSelector((state: RootState) => state.user?.mainBranch);
  return (
    // TODO: refactor to scss
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      padding={"1rem 1.5rem"}
      border={"2px solid #2D2D2D1A"}
      borderRadius={"1rem"}
      sx={{ "& .MuiTypography-root": { color: "#2D2D2D99" } }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <TextFieldIconLabel
          label={t("beginShift.branch")}
          icon={<Shop size="32" color="#6EC531" />}
        />
      </Stack>
      <Typography variant="h6" color="#2D2D2D99">
        {/* Here name is null for this user */}
        {branch?.name || ""}
      </Typography>
    </Stack>
  );
};
