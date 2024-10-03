import "./styles";

import { BagHappy, Coin1, Layer } from "iconsax-react";

import { ProductTaxInput } from "@myCash/common";
import { Stack } from "@mui/material";
import TextField from "../../components/form/TextField";
import { useTranslation } from "react-i18next";

// import { CoupledButton } from "../coupledButton";
// import { ImageInput } from "../imageInput";

export const QuickProductForm: React.FC = () => {
  const { t } = useTranslation();
  const fields = [
    {
      label: t("productModal.form.name"),
      name: "name",
      startIcon: <BagHappy variant="TwoTone" />,
    },

    {
      label: t("productModal.form.price"),
      name: "price",
      startIcon: <Coin1 variant="TwoTone" />,
      type: "number",
    },
    {
      label: t("productModal.form.quantity"),
      name: "quantity",
      startIcon: <Layer variant="TwoTone" />,
      type: "number",
    },
  ];
  // const { values, setFieldValue } = useFormikContext<{
  //   name: string;
  //   price: string;
  //   quantity: string;
  //   taxType: string;
  //   taxAvailable: string;
  //   discountType: "" | "1" | "2";
  // }>();
  // const [discountModalOpen, setDiscountModalOpen] = useState(false);
  // const discountTypeChecker = values.discountType
  //   ? values.discountType === "1"
  //     ? "filter.discountPrice"
  //     : "filter.discountPercent"
  //   : "cart.discountType";
  // const discountPlaceholderChecker = values.discountType ? (values.discountType === "1" ? "currency" : "%") : "";
  return (
    <Stack spacing={1.5}>
      {fields.map((field, index) => (
        <TextField
          key={index}
          label={field.label}
          name={field.name}
          startIcon={field.startIcon}
          type={field?.type || "text"}
          // endIcon={field?.endIcon}
        />
      ))}
      {/* <CoupledInput
        leftField={
          <CoupledButton title={t(discountTypeChecker)} openModal={() => setDiscountModalOpen(true)} textColor="grey" />
        }
        rightField={
          <CoupledTextField
            order="second"
            name="discount"
            placeholder={t(discountPlaceholderChecker)}
            disableNotchedOutline
          />
        }
      />
      <DiscountTypeModalContent
        open={discountModalOpen}
        handleClose={() => setDiscountModalOpen(false)}
        handleConfirmModal={(value) => {
          setFieldValue("discountType", value);
        }}
        defaultVal={values.discountType}
        handleCancel={() => {
          setFieldValue("discountType", "2");
          setDiscountModalOpen(false);
        }}
      /> */}
      <ProductTaxInput
        name="taxType"
        title="productModal.form.sellTax"
        typeName="taxType"
      />
    </Stack>
  );
};
