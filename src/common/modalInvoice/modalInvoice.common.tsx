import { Backdrop, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/form/Button";
// import BackButton from "../../components/ui/BackButton";
import {
  ActionsReturnContainer,
  StyledModalReturnBox,
  StyledModalReturnHeader,
  StyledModalReturnContainer,
} from "./styles";

interface ModalProps {
  title: string;
  open: boolean;
  hasActions: boolean;
  children?: React.ReactNode;
  removeBackBtn?: boolean;
  handleClose?: () => void;
  handleCancel?: () => void;
  handleBackBtn?: () => void;
  handleConfirm?: () => void;
  buttonsNames?: { action?: string; cancel?: string };
  loading?: boolean;
  removePadding?: boolean;
}

export const ModalInvoice: React.FC<ModalProps> = ({
  open,
  title = "تقرير منتجات",
  children,
  hasActions,
  // removeBackBtn = false,
  handleClose,
  // handleCancel,
  // handleBackBtn,
  handleConfirm,
  buttonsNames,
  loading = false,
  removePadding,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <StyledModalReturnBox>
          <StyledModalReturnHeader
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant={"h4"} color="grey.900">
              {t(title)}
            </Typography>
          
          </StyledModalReturnHeader>
          <StyledModalReturnContainer removePadding={removePadding}>
            {children}
            {/* for custom actions, pass them to children and hasActions as false */}
            {hasActions && (
              <ActionsReturnContainer spacing={2} direction="column">
                <Button
                  text={
                    buttonsNames && buttonsNames.action
                      ? t(buttonsNames.action)
                      : t("continue")
                  }
                  variant="contained"
                  color="primary"
                  onClick={handleConfirm}
                  loading={loading}
                />
                <Button
                  text={
                    buttonsNames && buttonsNames.cancel
                      ? t(buttonsNames.cancel)
                      : t("cancel")
                  }
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    handleClose && handleClose();
                  }}
                />
              </ActionsReturnContainer>
            )}
          </StyledModalReturnContainer>
        </StyledModalReturnBox>
      </Fade>
    </Modal>
  );
};
