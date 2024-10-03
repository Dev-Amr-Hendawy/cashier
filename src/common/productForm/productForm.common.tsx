import { Box, Stack } from "@mui/material";
import { useFormikContext } from "formik";
import { Add, BagHappy, Barcode, Coin1, I3Dcube, Layer, Location } from "iconsax-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CoupledInput,
  CoupledTextField,
  NewSelectInput,
  ProductTaxInput,
  RoundIconContainer,
} from "..";
import {
  AddSortModalContent,
  DiscountTypeModalContent,
} from "../../components";
import TextFieldNew from "../../components/form/TextFieldNew";
import { AddProductInitialValues } from "../../types/types";
import { AddCategoriesInput } from "../addCategoriesInput";
import { CoupledButton } from "../coupledButton";
import { ImageInput } from "../imageInput";

import "./styles";
interface Branch {
  value: string | number;
  label: string;
}

interface ProductFormProps {
  branchesData: Branch[];
}
interface Branch {
  value: string | number;
  label: string;
}

interface ProductFormProps {
  branchesData: Branch[];
}
export const ProductForm: React.FC<ProductFormProps> = ({ branchesData }) => {
  const { t } = useTranslation();
  const fields = [
    {
      label: t("productModal.form.name"),
      name: "name",
      startIcon: <BagHappy variant="TwoTone" />,
    },
    {
      label: t("productModal.form.name"),
      name: "name",
      startIcon: <BagHappy variant="TwoTone" />,
      type: "coupled",
    },
    {
      label: t("productModal.form.barcode"),
      name: "barCode",
      startIcon: <Barcode variant="TwoTone" />,
      endIcon: <RoundIconContainer icon={<Barcode color="#6EC53199" />} />,
    },
    {
      label: t("productModal.form.desc"),
      name: "desc",
      startIcon: <I3Dcube variant="TwoTone" />,
    },
    {
      label: t("productModal.form.sellPrice"),
      name: "price",
      startIcon: <Coin1 variant="TwoTone" />,
      inputType: "number",
    },
    //       {/*hidden buy Price  for now but will used  */}
    // {
    //   label: t("productModal.form.buyPrice"),
    //   name: "buyPrice",
    //   startIcon: <Coin1 variant="TwoTone" />,
    //   inputType: "number",
    // },
    {
      label: t("productModal.form.quantity"),
      name: "quantity",
      startIcon: <Layer variant="TwoTone" />,
      inputType: "number",
    },
  ];




  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const { setFieldValue, values } = useFormikContext<AddProductInitialValues>();
  const discountTypeChecker = values.discountType
    ? values.discountType === "1"
      ? "filter.discountPrice"
      : "filter.discountPercent"
    : "cart.discountType";
  const discountPlaceholderChecker = values.discountType
    ? values.discountType === "1"
      ? "currency"
      : "%"
    : "";

useEffect(() => {
  if(!values.branch_id)
  setFieldValue("branch_id",branchesData?.[0]?.value)
}, [])


  return (
    <Stack spacing={1.5}>
      <NewSelectInput
        name={"branch_id"}
        placeholder={t("branch")}
        startIcon={<Location size={24} />}
        options={branchesData?.length ? branchesData : []}
        defaultValue={values.branch ? values.branch.id : branchesData[0].value}
      />
      <ImageInput />
      {fields.map((field, index) =>
        field.type === "coupled" ? (
          <Box key={index}>
            <CoupledInput
              key={index}
              leftField={
                <CoupledButton
                  title={t("productModal.AddSort")}
                  icon={<Add size="32" color="#6EC53199" />}
                  openModal={() => setSortModalOpen(true)}
                />
              }
              rightField={
                <AddCategoriesInput
                  initialItem={values?.defaultCategory}
                  disableNotchedOutline
                />
              }
            />
            <AddSortModalContent
              open={sortModalOpen}
              handleClose={() => setSortModalOpen(false)}
              name="product_add_sort"
            />
          </Box>
        ) : (
          <TextFieldNew
            key={index}
            label={field.label}
            mainLabel={field.label}
            placeholder={field.label}
            name={field.name}
            startIcon={field.startIcon}
            endIcon={field.endIcon}
            type={field.inputType || "text"}
          />
        )
      )}
      <CoupledInput
        leftField={
          <CoupledButton
            title={t(discountTypeChecker)}
            openModal={() => setDiscountModalOpen(true)}
            textColor="grey"
          />
        }
        rightField={
          <CoupledTextField
            order="second"
            name="discount"
            placeholder={t(discountPlaceholderChecker)}
            disableNotchedOutline
            type="number"
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
      />
      <ProductTaxInput
        name="taxType"
        title="productModal.form.sellTax"
        typeName="taxType"
      />
      {/*hidden buy Tax   for now but will used  */}
      {/* <ProductTaxInput
        name="buyTaxType"
        title="productModal.form.buyTax"
        typeName="buyTaxType"
      /> */}
    </Stack>
  );
};
