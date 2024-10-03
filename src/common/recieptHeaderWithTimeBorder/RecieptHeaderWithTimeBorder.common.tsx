import "./styles.scss";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

interface RecieptHeaderWithTimeBorderProps {
  invoiceType?: boolean;
  invoiceNumber?: number;
  time?: string | number | ReactNode;
}

export const RecieptHeaderWithTimeBorder: React.FC<RecieptHeaderWithTimeBorderProps> = ({
  invoiceType,
  invoiceNumber, time
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="container-border-padding reciept-header">
      <Stack
        className={`icon-label-value-container`}
      >
        <Box display={"flex"} flexDirection={"column"} className="header-time" >


          <Typography variant="h6">{`${t(invoiceType ? "invoice.title" : "client.receipt")}`}</Typography>
          <Typography
            variant="h6"
            color="color.grey[600]"
            className="iconLabel-value-typography time"
          >{time}</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} >
        <Typography
          variant="h6"
          color="color.grey[600]"
          className="iconLabel-value-typography"
        >
          {invoiceNumber} #
        </Typography></Box>
      </Stack>
    </Stack>
  );
};
