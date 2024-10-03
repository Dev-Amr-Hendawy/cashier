import { Whatsapp } from "iconsax-react";
import { CommonModal } from "@myCash/common";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import QrImage from "@myCash/assets/images/qr-wa.png";
import Button from "../form/Button";

interface ContactUsModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  return (
    <CommonModal
      open={open}
      handleClose={handleClose}
      title="accountHelp.contactUs"
      hasActions={false}
    >
      <Stack className="contact-modal-container">
        <img src={QrImage} alt="qr-wa" height={"170px"} width={"160px"} />
        <Typography variant="body2" color={"#2D2D2DCC"}>
          {t("accountHelp.qrCode")}
        </Typography>

        <Button
          text="WhatsApp"
          width="50%"
          color="secondary"
          startIcon={<Whatsapp size={24} />}
          onClick={() => {
            window.open(
              "https://api.whatsapp.com/send?phone=201127516475&text=Hello%2C%20Can%20I%20speak%20to%20one%20of%20My-Cash%20representatives%3F"
            );
            handleClose();
          }}
        />
      </Stack>
    </CommonModal>
  );
};
