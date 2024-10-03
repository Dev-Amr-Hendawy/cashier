import { Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { Gallery } from "iconsax-react";
import { useTranslation } from "react-i18next";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import { StyledImageInputContainer } from "./styles";
import { AddProductInitialValues } from "../../types/types";

export const ImageInput: React.FC = () => {
  const { t } = useTranslation();
  const { setFieldValue, values } = useFormikContext<AddProductInitialValues>();

  return (
    <StyledImageInputContainer>
      <input
        type="file"
        onChange={(e) => {
          setFieldValue("image", e.target.files![0]);
        }}
      />
      <Stack direction="row" spacing={3} alignItems="center">
        <Gallery variant="TwoTone" color="var(--grey-900)" />
        <Typography variant="h5" color="grey.800">
          {t("productModal.form.image")}
        </Typography>
      </Stack>
      <img
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "contain",
        }}
        src={
          values.image && typeof values.image === "object"
            ? URL.createObjectURL(values.image)
            : values.image || imagePlaceholder
        }
        alt="image-placeholder"
      />
    </StyledImageInputContainer>
  );
};
