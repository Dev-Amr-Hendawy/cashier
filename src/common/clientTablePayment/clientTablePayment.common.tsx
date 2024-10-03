import Button from "@myCash/components/form/Button";
import { TablePaymentCompleted } from "../tablePaymentCompleted";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import "./styles.scss";

interface ClientTablePaymentProps {
  status: number;
  id: number;
}

export const ClientTablePayment: React.FC<ClientTablePaymentProps> = ({
  status,
  id,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return status === 1 ? (
    <TablePaymentCompleted />
  ) : (
    <Stack className="client-table-payment-button">
      <Button
        text={t("client.payReciepts")}
        color="primary"
        onClick={() => navigate(`/clients/${id}/reciepts`)}
      />
    </Stack>
  );
};
