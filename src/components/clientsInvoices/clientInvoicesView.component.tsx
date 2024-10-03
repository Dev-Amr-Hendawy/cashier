import { CircularLoader, NoData, Table } from "@myCash/common";

import { CircularProgress } from "@mui/material";
import { InvoiceType } from "@myCash/types";
import { clientsInvoicesColumns } from "./columnsStructure/clientsInvoicesColumns";
import { setInvoiceId } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useGetInvoices } from "@myCash/hooks";
import { useTranslation } from "react-i18next";

type Props = {
  client_id?: string;
};

export const ClientInvoicesView: React.FC<Props> = ({ client_id }) => {
  const { t } = useTranslation();
  //   const invoicesState = useSelector((state: RootState) => state.invoices);
  const columns = clientsInvoicesColumns(t);
  const dispatch = useDispatch();
  const rowClickHandler = (data: InvoiceType) => {
    dispatch(setInvoiceId(data.id));
  };
  const { hasNextPage, ref, data, isPending, isRefetching } = useGetInvoices({
    client_id,
  });
  const invoices = data?.pages.flat();


  if (
    !data?.pages[0] ||
    (data?.pages[0].length === 0 && !isPending && !isRefetching)
  )
    return <NoData />;
  return (
    <>
      {isPending || isRefetching ? (
        <CircularLoader size={50} />
      ) : (
        <Table 
          columns={columns}
          rows={invoices ? invoices : []}
          rowClickHandler={(data: InvoiceType) => rowClickHandler(data)}
        
        />
      )}
      {hasNextPage && !isPending && !isRefetching && (
        <CircularProgress size={24} ref={ref} />
      )}
    </>
  );
};
