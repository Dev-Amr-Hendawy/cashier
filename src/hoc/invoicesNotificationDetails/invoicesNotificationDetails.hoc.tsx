import { InvoicesNotificationDetailsContent } from "@myCash/components";
import { handleResetInvoicesNotificationsSlice, handleResetInvoicesSlice } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface ClientsInvoicesHocProps {}

export const InvoicesNotificationDetailsHoc: React.FC<
  ClientsInvoicesHocProps
> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleResetInvoicesSlice());  
      dispatch(handleResetInvoicesNotificationsSlice());
  }, [dispatch]);
  return <InvoicesNotificationDetailsContent />;
};
