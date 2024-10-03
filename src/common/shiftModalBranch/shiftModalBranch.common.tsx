import { Stack, Typography } from "@mui/material";
import { TextFieldIconLabel } from "../../common";
import { Shop } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../lib";

interface ShiftModalBranchProps {
  shiftType: "begin" | "end";
  info?: boolean;
}

export const ShiftModalBranch: React.FC<ShiftModalBranchProps> = ({
  info = false,
  shiftType = "begin",
}) => {
  const { t } = useTranslation();
  const branch = useSelector((state: RootState) => state.user?.mainBranch);

  
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: "1rem",
        border: info ? "none" : "2px solid var(--grey-700)",
        padding: info ? "0px" : "1rem 1.5rem",
        "& .MuiTypography-root": { color: "var(--grey-600)" },
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <TextFieldIconLabel
          label={t("beginShift.branch")}
          icon={
            <Shop
              size="32"
              color={shiftType === "begin" ? "#6EC531" : "#E83E00"}
            />
          }
        />
      </Stack>
      <Typography variant="h6" color="var(--grey-600)">
        {branch?.name}
      </Typography>
    </Stack>
  );
};
