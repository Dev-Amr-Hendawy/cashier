import { Stack } from "@mui/material";
import { ProductAutoSearch } from "@myCash/common/productAutoSearch";
import { Product } from "@myCash/types";
import { BagHappy, Barcode } from "iconsax-react";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface ReportFormProductFieldsProps {
  selectedItem: Product | undefined;
  setSelectedItem?: Dispatch<SetStateAction<Product | undefined>>;
  isResult?: boolean;
}

export const ReportFormProductFields: React.FC<
  ReportFormProductFieldsProps
> = ({ selectedItem, setSelectedItem }) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={1.5} padding={"0 1.5rem"}>
      <ProductAutoSearch
        name="product_id"
        placeholder={t("productModal.form.name")}
        startIcon={<BagHappy size={24} color="var(--grey-600)" />}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem && setSelectedItem}
      />
      <ProductAutoSearch
        name="product_id"
        placeholder={t("productModal.form.barcode")}
        startIcon={<Barcode size={24} color="var(--grey-600)" />}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem && setSelectedItem}
        isBarCode
      />
    </Stack>
  );
};
