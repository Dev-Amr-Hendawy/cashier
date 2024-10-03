import {
  ControlledCoupledTextField,
  ControlledTextField,
  CoupledInput,
} from "../../common";

import { CoupledButton } from "../../common/coupledButton";
import { DiscountTypeModalContent } from "..";
import { IoLayersOutline } from "react-icons/io5";
import { StyledAccordionDetails } from "../../common/cartSingleItem/styles";
import { TFunction } from "i18next";

interface CartSummaryContentProps {
  t: TFunction<"translation", undefined>;
  cartQuantity: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenDiscountModal: () => void;
  handleCloseDiscountModal: () => void;
  discountModalOpen: boolean;
  handleDiscountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  discountValue?: string | number;
  handleConfirmDiscountModal?: (value: "1" | "2") => void;
  defaultDiscountType?: "1" | "2";
}

export const CartSummaryFormContent: React.FC<CartSummaryContentProps> = ({
  t,
  cartQuantity,
  handleChange,
  handleOpenDiscountModal,
  handleCloseDiscountModal,
  discountModalOpen,
  handleDiscountChange,
  discountValue,
  handleConfirmDiscountModal,
  defaultDiscountType,
}) => {
  const discountTypeChecker = defaultDiscountType
    ? defaultDiscountType === "1"
      ? "filter.discountPrice"
      : "filter.discountPercent"
    : "cart.discountType";
  const discountPlaceholderChecker = defaultDiscountType
    ? defaultDiscountType === "1"
      ? "currency"
      : "%"
    : "";
  return (
    <StyledAccordionDetails>
      <ControlledTextField
        label=""
        placeholder="quant"
        mainLabel={t("quantity")}
        mainLabelIcon={<IoLayersOutline />}
        value={cartQuantity || ""}
        onChange={handleChange}
      />
      <CoupledInput
        gridStyle="1fr 1.25fr"
        leftField={
          <CoupledButton
            title={t(discountTypeChecker)}
            openModal={handleOpenDiscountModal}
          />
        }
        rightField={
          <ControlledCoupledTextField
            order="second"
            placeholder={t(discountPlaceholderChecker)}
            handleChange={handleDiscountChange}
            value={discountValue || ""}
          />
        }
      />
      <DiscountTypeModalContent
        open={discountModalOpen}
        handleClose={handleCloseDiscountModal}
        handleConfirmModal={handleConfirmDiscountModal}
        defaultVal={defaultDiscountType}
      />
    </StyledAccordionDetails>
  );
};
