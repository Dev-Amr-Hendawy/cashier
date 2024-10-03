import { Box, Stack } from "@mui/material";
import {
  InvoiceNotificationDetails,
  MainLoader,
  ScrollContainerWithCustomHeight,
} from "@myCash/common";
import { useGetNotification } from "@myCash/hooks";
import { MutableRefObject } from "react";

import Button from "@myCash/components/form/Button";
import { useTranslation } from "react-i18next";
import { InvoiceNotification } from "@myCash/common/invoiceNotification";

type NotificationDetailsWithActionsProps = {
  invoice_id: string;
  printerRef?: MutableRefObject<null>;
  handlePrint: () => void;
};
const StyleFlexContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  gap: "2rem",
  width: "100%",
  
  flexDirection: "column",
};

export const NotificationDetailsWithActions: React.FC<
  NotificationDetailsWithActionsProps
> = ({ invoice_id, printerRef,handlePrint }) => {
  const {t} =useTranslation()

  const { data, error, isPending } = useGetNotification(invoice_id);
  if (isPending) return <MainLoader />;
  if (error) return <></>;
  return (
    <Stack height={"100%"}>
      <Box
        sx={{
          padding: "0 1rem 0 0",
          height: "100%",
          ...StyleFlexContainer,
        }}
      >
    
        <ScrollContainerWithCustomHeight
     
          removeHeight={10}
          customStyle={{ flax: "1 1 0",padding:"1rem 0", ...StyleFlexContainer }}
        >

          <div ref={printerRef}>
            <InvoiceNotification borderless invoice={data} />
          </div> <InvoiceNotificationDetails invoice={data} />

          <Button 
            text={
              t("print")
            }
            width=""
            color="primary"
          onClick={handlePrint}
          />

        </ScrollContainerWithCustomHeight>
      </Box>
    </Stack>
  );
};
