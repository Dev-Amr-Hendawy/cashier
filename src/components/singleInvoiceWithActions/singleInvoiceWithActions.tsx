import { Box, Stack } from "@mui/material";
import {
  Invoice,
  InvoiceDetails,
  InvoiceDetailsActions,
  MainLoader,
  ScrollContainerWithCustomHeight,
} from "@myCash/common";
import { useGetInvoice } from "@myCash/hooks";
import { MutableRefObject } from "react";

type SingleInvoiceWithActionsProps = {
  invoice_id: string;
  printerRef?: MutableRefObject<null>;
};
const StyleFlexContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  gap: "2rem",
  width: "100%",
  flexDirection: "column",
};

export const SingleInvoiceWithActions: React.FC<
  SingleInvoiceWithActionsProps
> = ({ invoice_id, printerRef }) => {
  const { data, error, isPending } = useGetInvoice(invoice_id);
  if (isPending) return <MainLoader />;
  if (error) return <></>;
  const HaveAllQuantity=data.products.some(product=>Number(product.quantity) >0 )
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
        removeHeight={HaveAllQuantity?18:9}
          customStyle={{ flax: "1 1 0", ...StyleFlexContainer }}
        >
          <InvoiceDetails invoice={data} />
          <div ref={printerRef}>
            <Invoice borderless invoice={data} />
          </div>
        </ScrollContainerWithCustomHeight>
       { HaveAllQuantity? <InvoiceDetailsActions invoice={data} />:null}
      </Box>
    </Stack>
  );
};
