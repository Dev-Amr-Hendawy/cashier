import "./styles.scss";

import { IconLabelValueField, RecieptCardAppendix } from "@myCash/common";

import { PayRecieptModal } from "@myCash/components";
import { Receipt } from "@myCash/types";
import { Receipt1 } from "iconsax-react";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface RecieptCardProps {
  recieptId: string | number;
  invoiceId?: string;
  recieptAmount?: string;
  date: string;
  isCompleted: boolean;
  receipt: Receipt;
}

export const RecieptCard: React.FC<RecieptCardProps> = ({
  recieptId,
  invoiceId,
  recieptAmount,
  date,
  isCompleted,
  receipt,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <Stack className=" container-grey-border">
      <Stack className="reciept-card-container">
        {/* card header */}
        <IconLabelValueField
          label={t("client.receipt")}
          icon={<Receipt1 size="25" color="var(--grey-300)" />}
          value={`#${recieptId}`}
        />
        <Stack padding={"0 0 0 2.5rem"} className="reciept-card-content">
          {/* reciept id*/}
          {invoiceId && (
            <IconLabelValueField
              label={"client.invoiceId"}
              value={`#${invoiceId}`}
            />
          )}
          {/* reciept date*/}
          <IconLabelValueField
            label={t("client.invoiceDate")}
            value={`${date}`}
          />
          {/* reciept amount if not completed */}
          {!isCompleted && (
            <IconLabelValueField
              label={t("client.amount")}
              value={`${recieptAmount} SR`}
            />
          )}
        </Stack>
      </Stack>
      {/* invoice status */}
      <RecieptCardAppendix
        handleOpenModal={handleOpenModal}
        isCompleted={isCompleted}
        value={recieptAmount}
      />
      {!isCompleted && (
        <PayRecieptModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          receipt={receipt}
        />
      )}
    </Stack>
  );
};
