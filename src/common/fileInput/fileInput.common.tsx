import { ButtonBase, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { DocumentUpload } from "iconsax-react";
import { useTranslation } from "react-i18next";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import { AddProductInitialValues } from "../../types/types";
import "./styles.scss";
import { IconLabelValueField } from "..";

interface FileInputProps {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  icon?: React.ReactNode;
  placeholder?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  name,
  label,
  labelIcon,
  icon,
  placeholder,
}) => {
  const { t } = useTranslation();
  const { setFieldValue, values } = useFormikContext<AddProductInitialValues>();

  return (
    <Stack className="file-input-container">
      <IconLabelValueField label={label ? label : ""} icon={labelIcon} />
      <ButtonBase className="file-input-button">
        <input
          type="file"
          onChange={(e) => {
            setFieldValue(name, e.target.files![0]);
          }}
        />
        <Stack direction={"row"} gap={"1rem"}>
          <Stack direction="row" gap={"2rem"} alignItems="center">
            {icon ? icon : <DocumentUpload size={24} color="#2D2D2D99" />}
            <Typography variant="h6" color="#2D2D2D33">
              {placeholder ? t(placeholder) : t("expenses.form.file")}
            </Typography>
          </Stack>
          {values[name] ? (
            <img
              src={
                values.name && typeof values.name === "object"
                  ? URL.createObjectURL(values.name)
                  : values.name || imagePlaceholder
              }
              alt="image-placeholder"
            />
          ) : null}
        </Stack>
      </ButtonBase>
    </Stack>
  );
};
