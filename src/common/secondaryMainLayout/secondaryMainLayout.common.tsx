import { Stack } from "@mui/material";
import { HeaderWithBack } from "@myCash/common";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.scss";

interface SecondaryMainLayoutProps {
  title: string;
  children: React.ReactNode;
  removePadding?: boolean;
  handleBack?: () => void;
}

export const SecondaryMainLayout: React.FC<SecondaryMainLayoutProps> = ({
  title,
  children,
  removePadding,
  handleBack,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <HeaderWithBack
        title={t(title)}
        handleClose={() => (handleBack ? handleBack() : navigate(-1))}
      />
      <Stack
        className="secondary-main-layout-container"
        padding={removePadding ? "0 !important" : ""}
      >
        {children}
      </Stack>
    </>
  );
};
