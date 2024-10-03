import { Stack, Typography } from "@mui/material";
import { Clock, TagUser } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { TextFieldIconLabel } from "../../common";

interface ShiftModalInfoProps {
  userName: string;
  userRole: string;
  shiftType: "begin" | "end";
  info?: boolean;
}

export const ShiftModalInfo: React.FC<ShiftModalInfoProps> = ({
  userName,
  userRole,
  shiftType = "begin",
  info = false,
}) => {
  const { t } = useTranslation();
  const date = new Date();

  const dateString = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Stack
      sx={{
        gap: "1rem",
        borderRadius: "1rem",
        padding: info ? "0px" : "1rem 1.5rem",
        border: info ? "none" : "2px solid var(--grey-700)",
        width: "100%",
      }}
    >
      {!info && (
        <Typography variant="h5" color="primary">
          {t("welcome")}
        </Typography>
      )}
      <Typography variant="h4" color="color.black">
        {userName}
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ "& .MuiTypography-root": { color: "var(--grey-600)" } }}
      >
        <TextFieldIconLabel
          label={t("beginShift.role")}
          icon={
            <TagUser
              size="32"
              color={shiftType === "begin" ? "#6EC531" : "#E83E00"}
            />
          }
        />
        <Typography variant="h6" color="color.grey[600]">
          {userRole}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ "& .MuiTypography-root": { color: "var(--grey-600)" } }}
      >
        <TextFieldIconLabel
          label={t("beginShift.time")}
          icon={
            <Clock
              size="32"
              color={shiftType === "begin" ? "#6EC531" : "#E83E00"}
            />
          }
        />
        <Typography variant="h6" color="color.grey[600]">
          {`${dateString}, ${timeString}`}
        </Typography>
      </Stack>
    </Stack>
  );
};
