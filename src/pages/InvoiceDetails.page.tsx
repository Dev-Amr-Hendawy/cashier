import Fading from "@myCash/components/ui/animation/Fading";
import { InvoiceDetailsContent } from "@myCash/components";
import { MainLoader } from "@myCash/common";
import { useGetInvoice } from "@myCash/hooks";
import { useParams } from "react-router-dom";

export const InvoiceDetailsPage = () => {
  const { invoiceId } = useParams();
  const { data, isPending } = useGetInvoice(invoiceId || "");
  if (isPending) return <MainLoader />;
  if (!data) return null;
  return (
    <Fading>
      <InvoiceDetailsContent invoice={data} />
    </Fading>
  );
};
