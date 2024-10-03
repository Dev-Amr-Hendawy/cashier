import { useTranslation } from "react-i18next";
import { MainLoader, ModalInvoice } from "@myCash/common";
import { Stack } from "@mui/material";
import { InvoiceType } from "@myCash/types";
import { ReturnInvoiceInfo } from "@myCash/components";
import { useGetInvoice, useMakeReturnInvoice } from "@myCash/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState, setInvoiceId, setReturnInvoice } from "@myCash/lib";
import { INVOICES_QUERY_KEY } from "@myCash/constants";
import { useQueryClient } from "@tanstack/react-query";

type InvoicesReturnModalProps = {
  open: boolean;
  handleClose: () => void;
  invoice: InvoiceType;
};

export const InvoicesReturnModal: React.FC<InvoicesReturnModalProps> = ({
  open,
  handleClose,
  invoice,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const invoiceCashID = localStorage.getItem("invoiceCashID") || invoice.id;
  const { data, isPending,refetch } = useGetInvoice(`${invoiceCashID}` || "");

  useEffect(() => {
    if (data) {
      dispatch(setReturnInvoice(data));
    }
  }, [data, dispatch]);

  const returnInvoiceState = useSelector(
    (state: RootState) => state.returnInvoice
  );

  const { makeInvoiceMutation, handleInvoiceValuesBeforeSubmit } =
    useMakeReturnInvoice();

  const rowClickHandler = (id: string|number) => {
    id?
    dispatch(setInvoiceId(id)):null;
  };

  useEffect(() => {
    if (makeInvoiceMutation.data?.data?.data?.id) {
      const newInvoiceId = makeInvoiceMutation.data.data.data.id;
      invoice.id&&localStorage.setItem("invoiceCashID",`${invoice.id}`);
      queryClient.invalidateQueries({ queryKey: [INVOICES_QUERY_KEY] });
       refetch()
      rowClickHandler(newInvoiceId);
    } else if (localStorage.getItem("invoiceCashID")) {
     
      rowClickHandler(localStorage.getItem("invoiceCashID") || "");
      localStorage.removeItem("invoiceCashID");
    }
  }, [
    makeInvoiceMutation.data?.data?.data?.id,
    queryClient,
    rowClickHandler,invoice,makeInvoiceMutation?.isSuccess
  ]);

  if (isPending) return <MainLoader />;
  if (!data || !returnInvoiceState.invoice) return null;

  return (
    <ModalInvoice
      open={open}
      hasActions={true}
      title={t("invoice.returnInvoice")}
      handleConfirm={() => {
        handleInvoiceValuesBeforeSubmit();
        handleClose();
      }}
      loading={makeInvoiceMutation.isPending}
      handleCancel={handleClose}
      handleBackBtn={handleClose}
      handleClose={handleClose}
      buttonsNames={{
        action: "invoice.confirmReturnInvoice",
        cancel: "cancel",
      }}
    >
      <Stack gap={"12px"}>
        <ReturnInvoiceInfo invoice={returnInvoiceState.invoice} />
      </Stack>
    </ModalInvoice>
  );
};
