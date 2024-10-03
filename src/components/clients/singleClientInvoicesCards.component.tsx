import { AsideTitle, InvoiceCard } from "@myCash/common";
import { INVOICES_QUERY_KEY, PAYMENT_STATUS } from "@myCash/constants";

import { InvoiceType } from "@myCash/types";
import { RootState } from "@myCash/lib";
import { Stack } from "@mui/material";
import { getLimitedInvoices } from "@myCash/apis";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface SingleClientInvoicesCardsProps {}

export const SingleClientInvoicesCards: React.FC<
  SingleClientInvoicesCardsProps
> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const clientId = useSelector((state: RootState) => state.client?.client_id);

  const handleClick = () => {
    navigate(`/clients/${clientId}/invoices`);
  };
  const invoicesLimit = "2";
  const { data, isPending, isRefetching, error } = useQuery({
    queryKey: [INVOICES_QUERY_KEY, clientId, invoicesLimit],
    queryFn: getLimitedInvoices,
  });
  if (isPending || isRefetching || error) return <></>;

  return (
    <Stack>
      <AsideTitle
        title={t("client.invoices")}
        amount={data?.pagination?.total}
        showAll={data?.data?.length > 0}
        onClick={handleClick}
      />
      <Stack className="invoice-cards-container">
        {data?.data?.map((invoice: InvoiceType) => {
          return (
            <InvoiceCard
              invoiceId={invoice.id}
              invoiceValue={invoice.totalPrice}
              // TODO: change to date from API response when the API is ready
              date={"24-5-2025"}
              productCount={invoice.products.length.toString()}
              isCompleted={invoice.paymentStatus === PAYMENT_STATUS.PAID}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
