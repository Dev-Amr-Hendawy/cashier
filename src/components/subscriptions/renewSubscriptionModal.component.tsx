import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Devices, Gameboy } from "iconsax-react";
import {
  RootState,
  setSubscriptionPackage,
  setSubscriptionStep,
} from "@myCash/lib";
import { CommonModal, InvoiceSettingItem } from "@myCash/common";

interface RenewSubscriptionModalProps {
  open: boolean;
  handleClose: () => void;
  calculatePayment: (values: { [key: string]: string }) => void;
}

export const RenewSubscriptionModal: React.FC<RenewSubscriptionModalProps> = ({
  open,
  handleClose,
  calculatePayment,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <CommonModal
      open={open}
      handleClose={handleClose}
      title="subscriptions.renew"
      hasActions={false}
    >
      <Stack gap={"0.75rem"}>
        <InvoiceSettingItem
          icon={<Gameboy />}
          id={"details"}
          name={t("subscriptions.continueSameDevice")}
          onClick={() => {
            calculatePayment({
              package_id:
                user?.subscription?.package?.id.toLocaleString() || "",
            });
            dispatch(setSubscriptionStep(4));
            handleClose();
          }}
        />
        <InvoiceSettingItem
          icon={<Devices />}
          id={"renew"}
          name={t("subscriptions.newDevice")}
          onClick={() => {
            dispatch(setSubscriptionPackage(user?.subscription?.package?.id));
            dispatch(setSubscriptionStep(3));
            handleClose();
          }}
        />
      </Stack>
    </CommonModal>
  );
};
