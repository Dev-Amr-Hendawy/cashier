import "./styles.scss";

import { ClientRecieptData, PayRecieptModal } from "@myCash/components";

import Button from "../form/Button";
import { MainLoader } from "@myCash/common";
import { Receipt } from "@myCash/types";
import { RootState } from "@myCash/lib";
import { SINGLE_RECEIPT_QUERY_KEY } from "@myCash/constants";
import { getSingleReceipt } from "@myCash/apis";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ClientsReciptDetailsProps {}

export const ClientRecieptDetails: React.FC<ClientsReciptDetailsProps> = () => {
  const { t } = useTranslation();
  const receiptsState = useSelector((state: RootState) => state.receipt);
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: [SINGLE_RECEIPT_QUERY_KEY, receiptsState.receipt_id],
    queryFn: getSingleReceipt,
  });
  if (isPending) return <MainLoader />;
  const receipt: Receipt = data?.data?.data;
  return (
    <>
      <ClientRecieptData receipt={receipt} />

      {receipt.paymentStatus !== 1 && (
        <>
          <Button
            text={`${t("client.payReciept")} ${receipt.amount} ${t(
              "currency"
            )}`}
            notRounded
            color="secondary"
            onClick={() => setModalOpen(true)}
          />
          <PayRecieptModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            receipt={receipt}
          />
        </>
      )}
    </>
  );
};
