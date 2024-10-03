import { CircularProgress } from "@mui/material";
import { getInvoice } from "@myCash/apis";
import { PaymentDetailsContent } from "@myCash/components";
import Fading from "@myCash/components/ui/animation/Fading";
import { SINGLE_INVOICE_QUERY_KEY } from "@myCash/constants";
import { InvoiceType } from "@myCash/types/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const PaymentDetails = () => {
  const { invoiceId } = useParams();
  const { data, isPending } = useQuery({ queryKey: [SINGLE_INVOICE_QUERY_KEY, invoiceId || ""], queryFn: getInvoice });
  if (isPending) return <CircularProgress size={60} sx={{ margin: "auto auto" }} />;
  return (
    <Fading>
      <PaymentDetailsContent paymentData={data?.data?.data as InvoiceType} />
    </Fading>
  );
};
