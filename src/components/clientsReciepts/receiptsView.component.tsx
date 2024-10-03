import { CircularLoader, NoData, Table } from "@myCash/common";
import { RootState, setReceiptId } from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import { Receipt } from "@myCash/types";
import { clientsRecieptsColumns } from "./columnsStructure/clientsRecieptsColumns";
import { useGetReceipts } from "@myCash/hooks";
import { useTranslation } from "react-i18next";

export const ReceiptsView = () => {
  const { t } = useTranslation();
  const receiptState = useSelector((state: RootState) => state.receipt);
  const columns = clientsRecieptsColumns(t);
  const dispatch = useDispatch();
  const rowClickHandler = (data: Receipt) => {
    dispatch(setReceiptId(data.id));
  };
  const { hasNextPage, ref, data, isPending, isRefetching } = useGetReceipts(
    receiptState.filters.search_text
  );
  const receipts = data?.pages.flat();
  if (!data && !isRefetching && !isPending) return <NoData />;

  return (
    <>
      {isPending  ? (
        <CircularLoader size={50} />
      ) : (
        <Table
          columns={columns}
          rows={receipts ? receipts : []}
          rowClickHandler={(data: Receipt) => rowClickHandler(data)}
        />
      )}
      {hasNextPage && <CircularProgress size={24} ref={ref} />}
    </>
  );
};
