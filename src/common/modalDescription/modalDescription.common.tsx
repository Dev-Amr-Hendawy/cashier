import { Story } from "iconsax-react";
import { IconLabelValueField } from "../iconLabelValueField";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import "./styles.scss";

interface ModalDescriptionProps {
  description: string;
}

export const ModalDescription: React.FC<ModalDescriptionProps> = ({
  description,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="modal-description">
      <IconLabelValueField
        label={t(description)}
        icon={<Story color="#232773" size={24} />}
      />
    </Stack>
  );
};
