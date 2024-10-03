import { CommonModal } from "@myCash/common";
import { CommonModalProps } from "@myCash/types";
import { Stack, Typography } from "@mui/material";

interface DeviceDescModalProps extends CommonModalProps {
  description: string;
}

export const DeviceDescModal: React.FC<DeviceDescModalProps> = ({
  open,
  handleClose,
  description,
}) => {
  return (
    <CommonModal
      title="settings.deviceDesc"
      open={open}
      handleClose={handleClose}
      hasActions={false}
    >
      <Stack p={"1rem 0"} gap={"1.5rem"}>
        <Typography variant="body2" color={"var(--grey-300)"}>
          {description}
        </Typography>
      </Stack>
    </CommonModal>
  );
};
