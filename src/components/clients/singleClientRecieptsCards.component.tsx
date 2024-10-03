import { AsideTitle, RecieptCard } from "@myCash/common";
import { RECEIPTS_PAYMENT_STATUS, RECEIPTS_QUERY_KEY } from "@myCash/constants";

import { Receipt } from "@myCash/types";
import { RootState } from "@myCash/lib";
import { Stack } from "@mui/material";
import { getLimitedReceipts } from "@myCash/apis";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface SingleClientRecieptsCardsProps {}

export const SingleClientRecieptsCards: React.FC<
  SingleClientRecieptsCardsProps
> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const clientId = useSelector((state: RootState) => state.client?.client_id);

  const handleClick = () => {
    navigate(`/clients/${clientId}/reciepts`);
  };
  const receiptsLimit = "2";
  const { data, isPending, isRefetching, error } = useQuery({
    queryKey: [RECEIPTS_QUERY_KEY, clientId, receiptsLimit],
    queryFn: getLimitedReceipts,
  });
  if (isPending || isRefetching || error) return <></>;
  return (
    <Stack>
      <AsideTitle
        title={t("client.reciepts")}
        amount={data?.pagination?.total}
        showAll={data?.data?.length > 0}
        onClick={handleClick}
      />
      <Stack className="invoice-cards-container">
        {data?.data?.map((reciept: Receipt) => {
          return (
            <RecieptCard
              key={reciept.id}
              receipt={reciept}
              recieptId={reciept.id}
              recieptAmount={reciept.amount}
              date={reciept.date}
              isCompleted={
                reciept.paymentStatus === RECEIPTS_PAYMENT_STATUS.PAID
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
