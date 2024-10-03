import "./styles.scss";

import { ReactNode } from "react";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { InvoiceType } from "@myCash/types";
import paymentClientIcon from "../../assets/icons/payment-client.svg";

interface LabelValueFieldWithClientProps {
  label: string;
  icon?: ReactNode;
  value?: string | number | ReactNode;
  hasBorder?: boolean;
  fixedLabelValue?: string;
  className?: string;
  invoice?: InvoiceType;
}

export const LabelValueFieldWithClient: React.FC<
  LabelValueFieldWithClientProps
> = ({
  label,
  icon,
  value,
  hasBorder,
  fixedLabelValue,
  className,
  invoice,
}) => {
  return (
    <Stack
      className={`${
        hasBorder
          ? "Label-Value-Field-With-Client has-border"
          : "Label-Value-Field-With-Client"
      } ${className ?? ""}`}
    >
      {invoice?.client ? (
        <Stack direction="row" spacing={1}  className={"client"}>
          <img src={paymentClientIcon} alt="payment-client" />
          <Stack direction="column" alignItems="flex-start" display={"flex"} className={"client-details"}>
            <Typography variant="h5" color="grey.900">
              {invoice?.client?.name}
            </Typography>
            <Typography variant="h5" color="grey.400">
              {invoice?.client?.phone}
            </Typography>
          </Stack>
        </Stack>
      ): (
        <Stack direction="row" spacing={1}  className={"client"}>
          {/* <img src={paymentClientIcon} alt="payment-client" /> */}
          <Stack direction="column" alignItems="flex-start" display={"flex"} className={"client-details"}>
            <Typography variant="h5" color="grey.900">
              {"no have a client"}
            </Typography>
            {/* <Typography variant="h5" color="grey.400">
            {"no have a client"}
            </Typography> */}
          </Stack>
        </Stack>
      )}
      <Stack >
      <Stack>
        {icon}
        <Typography variant="h6">{`${label} ${
          fixedLabelValue ? fixedLabelValue : ""
        }`}</Typography>
      </Stack>
      <Typography
        variant="h6"
        color="color.grey[600]"
        className="iconLabel-value-typography"
      >
        {value}
      </Typography>
    </Stack></Stack>
  );
};
