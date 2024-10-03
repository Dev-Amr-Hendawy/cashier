import { Stack, Typography } from "@mui/material";
import { IconLabelValueField } from "..";
import { CloseCircle, Danger } from "iconsax-react";
import "./styles.scss";

interface NotificationItemProps {
  title: string;
  handleDelete: () => void;
  time?: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  handleDelete,
  time,
}) => {
  return (
    <Stack className="container-border-padding notification-item-container">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <IconLabelValueField
          label={title}
          icon={<Danger size={24} color="#E83E00" />}
        />
        <CloseCircle
          variant="Bold"
          size={24}
          color="#2D2D2D66"
          onClick={handleDelete}
        />
      </Stack>
      <Typography fontSize={12} fontWeight={400} color={"#2D2D2D99"}>
        {time}
      </Typography>
    </Stack>
  );
};
