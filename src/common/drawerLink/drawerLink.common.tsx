import "./styles.scss";

import { ButtonBase, Stack, Typography } from "@mui/material";

import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { DrawerLinkItem } from "@myCash/types/types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@myCash/i18n";

export const DrawerLink: React.FC<DrawerLinkItem> = ({
  icon,
  link,
  title,
  handleClick,
  value,
  image,
  hasArrow,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClickItem = () => {
    link && navigate(link);
    handleClick && handleClick();
  };
  const dir = i18n.dir();
  return (
    <ButtonBase className="drawer-link" onClick={handleClickItem}>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        {icon}
        <Typography color={"var(--grey-900)"}>{t(title)}</Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={"0.5rem"}>
        {value ? (
          <Typography variant="h5" color={"grey.600"}>
            {value}
          </Typography>
        ) : image ? (
          <img src={image} height={"90px"} width={"70px"} />
        ) : dir === "rtl" ? (
          <ArrowLeft2 variant="TwoTone" color="var(--grey-900)" size="16" />
        ) : (
          <ArrowRight2 variant="TwoTone" color="var(--grey-900)" size="16" />
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
