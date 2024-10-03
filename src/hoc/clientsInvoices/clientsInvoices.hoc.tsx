import { ClientsInvoicesContent } from "@myCash/components";
import { handleResetInvoicesSlice, setInvoiceId, setInvoicesSearchText } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface ClientsInvoicesHocProps {}

export const ClientsInvoicesHoc: React.FC<ClientsInvoicesHocProps> = () => {
  const dispatch = useDispatch();
  const { invoiceId } = useParams();

  useEffect(() => {
    if(invoiceId) { dispatch(setInvoiceId(invoiceId))
      dispatch(setInvoicesSearchText(invoiceId));
    }
      else dispatch(handleResetInvoicesSlice());
  }, [dispatch]);
  return <ClientsInvoicesContent />;
};
