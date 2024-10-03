import { useFormikContext } from "formik";
import { DiscountShape } from "iconsax-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { GenericRadioGroup } from "..";
import { AddProductInitialValues } from "../../types/types";

interface ProductTaxInputProps {
  name: string;
  title: string;
  typeName: string;
}

export const ProductTaxInput: React.FC<ProductTaxInputProps> = ({
  name,
  title,
  typeName,
}) => {
  const { t } = useTranslation();
  const taxInputs = [
    {
      value: "0",
      label: t("productModal.form.tax1"),
    },
    {
      value: "1",
      label: t("productModal.form.tax2"),
    },
    {
      value: "2",
      label: t("productModal.form.tax3"),
    },
  ];
  const { setFieldValue, values } = useFormikContext<AddProductInitialValues>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.value);
  };
  return (
    <GenericRadioGroup
      handleChange={handleChange}
      icon={<DiscountShape variant="TwoTone" />}
      inputs={taxInputs}
      title={t(title)}
      value={values[typeName] as string}
    />
  );
};
