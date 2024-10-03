import { CircularLoader, NoData, TableNotificationDetails } from "@myCash/common";

import { IInvoiceNotification } from "@myCash/types";
import { setInvoiceNotificationId } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useGetInvoicesNotifications } from "@myCash/hooks";


type Props = {
  client_id?: string;
};

export const InvoicesNotificationDetailsView: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const rowClickHandler = (data: IInvoiceNotification) => {
    dispatch(setInvoiceNotificationId(data.id));
  };
  const {  data, isPending, isRefetching } =
    useGetInvoicesNotifications();
  const invoices = data?.pages.flat();

  if (!data && !isRefetching && !isPending) return <NoData />;

  return (
    <>
      {isPending || isRefetching ? (
        <CircularLoader size={50} />
      ) : (
        <TableNotificationDetails 
        invoices={invoices ? invoices : []}
          rowClickHandler={(data: IInvoiceNotification) =>{
            rowClickHandler(data)
          }
          }
        />
      )}
      
    </>
  );
};
