import { InvoicesNotificationsContent } from "@myCash/components";
import { handleResetInvoicesSlice } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface ClientsInvoicesHocProps {}

export const InvoicesNotificationsHoc: React.FC<
  ClientsInvoicesHocProps
> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleResetInvoicesSlice());
  }, [dispatch]);
  return <InvoicesNotificationsContent />;
};
