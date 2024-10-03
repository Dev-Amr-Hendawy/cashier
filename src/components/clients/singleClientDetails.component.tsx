import {
  ArchiveBook,
  Call,
  DiscountShape,
  Location,
  Profile,
} from "iconsax-react";
import { Stack, Typography } from "@mui/material";

import { IconLabelValueField } from "@myCash/common";
import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface SingleClientDetailsProps {
  changeFetchStatus?: (status: string) => void;
}

export const SingleClientDetails: React.FC<SingleClientDetailsProps> = () => {
  const { t } = useTranslation();
  const client = useSelector((state: RootState) => state.client);
  return (
    <Stack className="client-details-container">
      {/* client id */}
      <Stack className="container-border-padding  ">
        <IconLabelValueField
          icon={<Profile color="#6EC531" />}
          label={t("client.clientId")}
          value={client?.client_id || ""}
        />
      </Stack>
      {/* client data */}
      <Stack className="container-border-padding " gap={"0.75rem"}>
        <Typography variant="h4" mb={"4px"}>
          {client?.name}
        </Typography>
        {client?.phone && (
          <IconLabelValueField
            icon={<Call size={24} color="var(--grey-900)" />}
            label={t("phone")}
            value={client?.phone || ""}
          />
        )}
        {client?.taxRecord && (
          <IconLabelValueField
            icon={<DiscountShape size={24} color="var(--grey-900)" />}
            label={t("client.form.taxRecord")}
            value={client?.taxRecord || ""}
          />
        )}
        {client?.commercialRecord && (
          <IconLabelValueField
            icon={<ArchiveBook size={24} color="var(--grey-900)" />}
            label={t("client.form.commercialRecord")}
            value={client?.commercialRecord || ""}
          />
        )}
      </Stack>
      {/* client address */}
      {client?.address && (
        <Stack className="container-border-padding " gap={"0.75rem"}>
          <IconLabelValueField
            icon={<Location size="20" color="var(--grey-900)" />}
            label={t("client.form.address")}
            value=""
          />
          <Typography variant="subtitle2" fontWeight={"600"} ml={"2.25rem"}>
            {client?.address || ""}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
