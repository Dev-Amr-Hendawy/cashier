import { ButtonBase, Stack, Typography } from "@mui/material";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import "./styles.scss";
import i18n from "@myCash/i18n";

interface InvoiceSettingItemProps {
  name: string;
  icon: JSX.Element;
  onClick?: () => void;
  hasArrow?: boolean;
  id?: string | number;
  value?: string;
  image?: string;
}

export const InvoiceSettingItem: React.FC<InvoiceSettingItemProps> = ({
  name,
  icon,
  onClick,
  hasArrow,
  value,
  image,
}) => {
  const dir = i18n.dir();
  return (
    <ButtonBase onClick={onClick} className="invoice-setting-item">
      <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
        {icon}
        <Typography variant="h6" color="grey.300">
          {name}
        </Typography>
      </Stack>
      <Stack className="setting-arrow-value">
        {value && <Typography variant="h6">{value}</Typography>}
        {image && (
          <img className="invoice-item-image" src={image} alt="profile" />
        )}
        {hasArrow &&
          (dir === "rtl" ? (
            <ArrowLeft2 variant="TwoTone" color="var(--grey-900)" size="16" />
          ) : (
            <ArrowRight2 variant="TwoTone" color="var(--grey-900)" size="16" />
          ))}
      </Stack>
    </ButtonBase>
  );
};
