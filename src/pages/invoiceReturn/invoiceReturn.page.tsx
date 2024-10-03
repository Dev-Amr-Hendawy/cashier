import { RootState, setReturnInvoice } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import Fading from "@myCash/components/ui/animation/Fading";
import { InvoiceReturnContent } from "@myCash/components";
import { MainLoader } from "@myCash/common";
import { useEffect } from "react";
import { useGetInvoice } from "@myCash/hooks";
import { useParams } from "react-router-dom";

export const InvoiceReturn = () => {
  const { invoiceId } = useParams();
  const { data, isPending } = useGetInvoice(invoiceId || "");
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setReturnInvoice(data));
    }
  }, [data, dispatch]);
  const returnInvoiceState = useSelector(
    (state: RootState) => state.returnInvoice
  );
  if (isPending) return <MainLoader />;
  if (!data || !returnInvoiceState.invoice) return null;
  return (
    <Fading>
      <InvoiceReturnContent invoice={returnInvoiceState.invoice} />
    </Fading>
  );
};
