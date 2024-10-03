import { ActionsContainer } from "@myCash/common";
import Button from "../form/Button";
import { useTranslation } from "react-i18next";

interface RecieptModalActionsProps {
  submitRecieptPayment: () => void;
  isPending: boolean;
  handleClose: () => void;
}

export const RecieptModalActions: React.FC<RecieptModalActionsProps> = ({
  submitRecieptPayment,
  isPending,
  handleClose,
}) => {
  const { t } = useTranslation();
  return (
    <ActionsContainer spacing={2} direction="row" width={"100%"}>
      <Button
        text={t("payment.confirm")}
        variant="contained"
        color="primary"
        type="submit"
        onClick={submitRecieptPayment}
        loading={isPending}
      />
      <Button
        text={t("cancel")}
        variant="outlined"
        // type="submit"
        onClick={handleClose}
      />
    </ActionsContainer>
  );
};
