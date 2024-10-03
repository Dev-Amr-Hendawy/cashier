import "./styles.scss";

import { ArrowCircleRight, Profile } from "iconsax-react";
import { Stack, Typography } from "@mui/material";

import { Client } from "@myCash/types/types";
import { IconLabelValueField } from "@myCash/common";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ClientGridCardProps {
  hasReciept?: boolean;
  price?: string;
  onClick?: (data: Client) => void;
  onLongPress?: (data: Client) => void;
  client: Client;
}

export const ClientGridCard: React.FC<ClientGridCardProps> = ({
  client,
  onClick,
  // price,
  onLongPress,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handlePayReciept = (id: number) => {
    navigate(`/clients/${id}/reciepts`);
  };

  return (
    <Stack
      className="client-gird-card"
      onClick={() => onClick && onClick(client)}
      onMouseDown={() => onLongPress && onLongPress(client)}
    >
      <Stack className="client-card-content">
        <IconLabelValueField
          label={client.name}
          icon={<Profile size="24" color="var(--grey-300)" />}
        />
        <Stack padding={"0 2.5rem"}>
          <Typography variant="h6" color={"var(--grey-300)"}>
            {client.email}
          </Typography>
          <Typography variant="subtitle2">{client.phone}</Typography>
        </Stack>
      </Stack>
      <Stack
        className={
          client.payment_status === 2
            ? "active-client-appendix"
            : "client-card-appendix"
        }
        onClick={() => {
          if (client.payment_status === 2) {
            client.id && handlePayReciept(client?.id);
          }
        }}
      >
        {client.payment_status === 2 && (
          <>
            <Stack>
              <ArrowCircleRight size="16" color="#fff" />
              <Typography>{t("client.payReciepts")}</Typography>
            </Stack>
            {/* <Typography>{price} ر.س</Typography> */}
          </>
        )}
      </Stack>
    </Stack>
  );
};
