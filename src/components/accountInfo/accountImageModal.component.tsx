import { Stack } from "@mui/material";
import {
  BackDrop,
  CommonModal,
  IconLabelValueField,
  ImageCaptureButton,
} from "@myCash/common";
import { ImageInputButton } from "@myCash/common/imageInputButton";
import { Formik } from "formik";
import { Story } from "iconsax-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageCaptureModal } from "./imageCaptureModal.component";

interface AccountImageModalProps {
  open: boolean;
  handleClose: () => void;
  defaultValue: string;
  updateHandler: (value: { [key: string]: string }) => void;
  profilePending: boolean;
}

export const AccountImageModal: React.FC<AccountImageModalProps> = ({
  open,
  handleClose,
  defaultValue,
  updateHandler,
  profilePending,
}) => {
  const { t } = useTranslation();
  const [captureOpen, setCaptureOpen] = useState(false);
  return (
    <Formik
      initialValues={{ logo: defaultValue || "" }}
      onSubmit={async (values) => {
        await updateHandler(values);
      }}
      enableReinitialize
    >
      {({ handleSubmit, values, setFieldValue }) => {
        const img =
          values.logo && typeof values.logo === "object"
            ? URL.createObjectURL(values.logo)
            : values.logo || "";
        return (
          <CommonModal
            hasActions
            open={open}
            handleClose={handleClose}
            title="accountInfo.profileImage"
            handleConfirm={handleSubmit}
          >
            <BackDrop open={profilePending || false} />
            <Stack className="account-image-modal">
              <IconLabelValueField
                label={t("accountInfo.profileImageDesc")}
                icon={<Story color="#232773" size={24} />}
              />
              {/* image */}
              <img src={img} alt="profile" />
              {/* image buttons */}
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-around"}
                gap={"6rem"}
              >
                <ImageInputButton name="logo" />
                {/* <ImageInputButton name="logo" />
                 */}
                <ImageCaptureButton clickHandler={() => setCaptureOpen(true)} />
              </Stack>
              <ImageCaptureModal
                open={captureOpen}
                handleClose={() => setCaptureOpen(false)}
                handleCatpureSubmit={(image) => setFieldValue("logo", image)}
              />
            </Stack>
          </CommonModal>
        );
      }}
    </Formik>
  );
};
