import "./styles.scss";

import { Box, Stack, Typography } from "@mui/material";

import { Client } from "@myCash/types/types";
import { MainIcon } from "@myCash/common";
import { More } from "iconsax-react";
import paymentClientIcon from "../../assets/icons/payment-client.svg";

interface PaymentClientProps {
  hideMenu?: boolean;
  roundedBorders?: boolean;
  client: Client | null;
}

export const PaymentClient: React.FC<PaymentClientProps> = ({
  hideMenu,
  roundedBorders,
  client,
}) => {
  return (
    <Stack
      className={
        roundedBorders
          ? "payment-client-container border-radius"
          : "payment-client-container"
      }
    >
      <Stack direction="row" spacing={1}>
        <img src={paymentClientIcon} alt="payment-client" />
        <Stack direction="column" alignItems="flex-start">
          <Typography variant="h5" color="grey.900">
            {client?.name}
          </Typography>
          <Typography variant="h5" color="grey.400">
            {client?.phone}
          </Typography>
        </Stack>
      </Stack>
      {!hideMenu && (
        <Box
          sx={{
            transform: "rotate(90deg)",
          }}
        >
          <MainIcon
            icon={<More variant="TwoTone" color="#2D2D2D" />}
            bgColor="transparent"
          />
        </Box>
      )}
    </Stack>
  );
};
