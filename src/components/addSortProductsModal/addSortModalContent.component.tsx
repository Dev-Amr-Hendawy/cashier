import { useTranslation } from "react-i18next";
import { CommonModal } from "../../common";
import { Button, Stack } from "@mui/material";
import { useFormikContext } from "formik";
import TextField from "../form/TextField";
import { useState } from "react";
import { Bubble, CloseCircle } from "iconsax-react";
import { AddProductInitialValues } from "../../types/types";
// TODO:: refactor
interface AddSortModalContentProps {
  open: boolean;
  handleClose: () => void;
  name: string;
}

export const AddSortModalContent: React.FC<AddSortModalContentProps> = ({
  open,
  handleClose,
  name,
}) => {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext<AddProductInitialValues>();
  const [sortValues, setSortValues] = useState<string[]>([""]);
  //add new textfield by adding the value to formik values and the new value to the array + empty index
  const handleAdd = () => {
    setFieldValue(name, values.product_add_sort);
    setSortValues([...values.product_add_sort, ""]);
  };
  //delete by removing the clicked textfield from array and the new array is set as value for formik
  const handleDelete = (index: number) => {
    setSortValues((prevSortValues) =>
      prevSortValues.filter((_, i) => i !== index)
    );
    const updatedValues = { ...values } as AddProductInitialValues;
    delete (updatedValues[name] as string[])[index];
    setFieldValue(name, updatedValues[name]);
  };
  const activeTextFieldIndex = sortValues.length - 1;

  const handleAddandClose = () => {
    values.product_add_sort[activeTextFieldIndex] && handleAdd();
    handleClose();
  };
  return (
    <CommonModal
      title={t("productModal.AddSort")}
      open={open}
      handleClose={handleClose}
      handleConfirm={handleAddandClose}
      hasActions
      buttonsNames={{ action: "add" }}
    >
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        className="sort-modal-button"
        sx={{
          margin: "-16px -17px 0 -25px",
          width: "calc(100% + 49px)",
          "&.Mui-disabled": {
            backgroundColor: "#6EC53199",
            color: "#FFFFFF",
          },
        }}
        onClick={handleAdd}
        disabled={!values.product_add_sort[activeTextFieldIndex]}
      >
        {t("productModal.NewSort")}
      </Button>
      <Stack spacing={2}>
        {sortValues.map((_value, index) => (
          <TextField
            startIcon={<Bubble size="32" color="#2D2D2D" />}
            key={index}
            name={`${name}.${index}`}
            label={t("productModal.Sort")}
            disabled={index !== activeTextFieldIndex}
            endIcon={
              index !== activeTextFieldIndex ? (
                <CloseCircle
                  size="32"
                  color="#2D2D2D66"
                  onClick={() => handleDelete(index)}
                />
              ) : null
            }
          />
        ))}
      </Stack>
    </CommonModal>
  );
};
