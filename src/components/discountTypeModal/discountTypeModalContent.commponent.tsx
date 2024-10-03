import { useTranslation } from "react-i18next";
import { CommonModal, GenericRadioGroup } from "../../common";
import { useState } from "react";
import { DiscountShape } from "iconsax-react";

interface DiscountTypeContentProps {
  open: boolean;
  handleClose: () => void;
  value?: string;
  handleConfirmModal?: (value: "1" | "2") => void;
  discountTypeValue?: "1" | "2";
  defaultVal?: "1" | "2" | "";
  handleCancel?: () => void;
}

export const DiscountTypeModalContent: React.FC<DiscountTypeContentProps> = ({
  open,
  handleClose,
  handleConfirmModal,
  defaultVal,
  handleCancel,
}) => {
  const { t } = useTranslation();
  const taxInputs = [
    {
      value: "2",
      label: t("filter.discountPercent"),
    },
    {
      value: "1",
      label: t("filter.discountPrice"),
    },
  ];
  const [value, setValue] = useState(defaultVal ? defaultVal : "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const handleCancelModal = () => {
    if (handleCancel) {
      setValue("");
      handleCancel();
    } else {
      handleClose();
    }
  };
  return (
    <CommonModal
      title={t("cart.discountType")}
      hasActions
      open={open}
      handleClose={handleClose}
      handleCancel={handleCancelModal}
      handleBackBtn={handleCancelModal}
      handleConfirm={
        handleConfirmModal
          ? () => {
              handleConfirmModal(value as "1" | "2");
              handleClose();
            }
          : undefined
      }
    >
      <GenericRadioGroup
        handleChange={handleChange}
        icon={<DiscountShape variant="TwoTone" />}
        inputs={taxInputs}
        title={t("cart.discountType")}
        value={value}
      />
    </CommonModal>
  );
};
