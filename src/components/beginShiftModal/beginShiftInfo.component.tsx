import { Stack, Typography } from "@mui/material";
import { Clock, TagUser } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { TextFieldIconLabel } from "../../common";

interface BeginShiftInfoProps {
  userName: string;
  userRole: string;
}

export const BeginShiftInfo: React.FC<BeginShiftInfoProps> = ({
  userName,
  userRole,
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
      gap={"1rem"}
      padding={"1rem 1.5rem"}
      border={"2px solid var(--grey-700)"}
      borderRadius={"1rem"}
    >
      <Typography variant="h5" color="primary">
        {t("welcome")}
      </Typography>
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
          icon={<TagUser size="32" color="#6EC531" />}
        />
        <Typography variant="h6" color="#2D2D2D99">
          {userRole}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ "& .MuiTypography-root": { color: "#2D2D2D99" } }}
      >
        <TextFieldIconLabel
          label={t("beginShift.time")}
          icon={<Clock size="32" color="#6EC531" />}
        />
        <Typography variant="h6" color="#2D2D2D99">
          {`${dateString}, ${timeString}`}
        </Typography>
      </Stack>
    </Stack>
  );
};
