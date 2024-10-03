import { ClientsContent } from "@myCash/components";
import { handleResetClientSlice } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface ClientsHocProps {}

export const ClinetsHoc: React.FC<ClientsHocProps> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleResetClientSlice());
  }, [dispatch]);
  return <ClientsContent />;
};
