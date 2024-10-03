import { CircularLoader, NoData, Table } from "@myCash/common";

import { CircularProgress } from "@mui/material";
import { IInvoiceNotification } from "@myCash/types";
import { InvoicesNotificationsColumns } from "./columnsStructure/invoicesNotificationsCloumns";
import { setInvoiceNotificationId } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useGetInvoicesNotifications } from "@myCash/hooks";
import { useTranslation } from "react-i18next";

type Props = {
  client_id?: string;
};

export const InvoicesNotificationsView: React.FC<Props> = () => {
  const { t } = useTranslation();
  //   const invoicesState = useSelector((state: RootState) => state.invoices);
  const columns = InvoicesNotificationsColumns(t);
  const dispatch = useDispatch();
  const rowClickHandler = (data: IInvoiceNotification) => {
    dispatch(setInvoiceNotificationId(data.id));
  };
  const { hasNextPage, ref, data, isPending, isRefetching } =
    useGetInvoicesNotifications();
  const invoices = data?.pages.flat();

  if (!data && !isRefetching && !isPending) return <NoData />;

  return (
    <>
      {isPending || isRefetching ? (
        <CircularLoader size={50} />
      ) : (
        <Table
          columns={columns}
          rows={invoices ? invoices : []}
          rowClickHandler={(data: IInvoiceNotification) =>
            rowClickHandler(data)
          }
        />
      )}
      {hasNextPage && !isPending && !isRefetching && (
        <CircularProgress size={24} ref={ref} />
      )}
    </>
  );
};
