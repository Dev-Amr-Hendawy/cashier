import { TextField } from "@mui/material";
import { CommonModal } from "@myCash/common";
import { ModalProps } from "@myCash/types";
import { CardTick1 } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface AddPriceModalProps extends ModalProps {
  productId: number | null;
  handleProductPrice: (id: number, price: number) => void;
  icon?: React.ReactNode;
}

export const AddPriceModal: React.FC<AddPriceModalProps> = ({
  open,
  handleClose,
  productId,
  title, icon,
  handleProductPrice,
}) => {
  const [price, setPrice] = useState<number | null>(null);
  const { t } = useTranslation();
  return (
    <CommonModal
      buttonsNames={{ action: "continue-1" }}
      open={open}
      hasActions
      haveExtraPadding
      icon={icon} removeBackBtn
      handleClose={handleClose}
      title={title}
      handleConfirm={() => {
        productId && price && handleProductPrice(productId, price);
        handleClose && handleClose();
      }}     >
      <TextField
        className="add-price-input"
        label={t("client.amount")}
        InputProps={{
          endAdornment: <CardTick1 />
        }}
        variant="outlined"

        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "100rem",
            // gap: "1rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          }, "& .MuiFormLabel-root.Mui-focused  .MuiStack-root .MuiTypography-root": {
            width: "auto",
            fontSize: "1rem !important",
            margin: "0 20px",
          },
        }}
        type="number"
        onChange={(e) => {
          setPrice(Number(e.target.value));
        }}
      />
    </CommonModal>
  );
};
