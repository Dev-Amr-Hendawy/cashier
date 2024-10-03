import {
  RootState,
  deleteProductQuickInvoice,
  resetQuickInvoice,
} from "@myCash/lib";
import { useDispatch, useSelector } from "react-redux";

import { QuickInvoiceContent } from "@myCash/components";
import { useEffect } from "react";

export const QuickInvoiceHOC: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetQuickInvoice());
    };
  }, [dispatch]);
  const quickInvoiceState = useSelector(
    (state: RootState) => state.quickInvoice
  );
  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProductQuickInvoice(id));
  };
  const handleResetPayments = () => {
    dispatch(resetQuickInvoice());
  };
  return (
    <QuickInvoiceContent
      handleDeleteProduct={handleDeleteProduct}
      quickInvoiceState={quickInvoiceState}
      handleResetPayments={handleResetPayments}
    />
  );
};
