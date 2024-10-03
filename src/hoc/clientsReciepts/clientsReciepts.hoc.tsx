import { ClientsRecieptsContent } from "@myCash/components";
import { handleResetReceiptsSlice } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface ClientsRecieptsHocProps {}

export const ClientsRecieptsHoc: React.FC<ClientsRecieptsHocProps> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // reset the redux state for the receipt
    return () => {
      dispatch(handleResetReceiptsSlice());
    };
  }, [dispatch]);
  return <ClientsRecieptsContent />;
};
