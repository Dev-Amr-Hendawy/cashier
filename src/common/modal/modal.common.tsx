import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/form/Button";
import BackButton from "../../components/ui/BackButton";
import {
  ActionsContainer,
  StyledModalBox,
  StyledModalHeader,
  StyledModalMainContainer,
} from "./styles";

interface ModalProps {
  title: string;
  open: boolean;
  hasActions: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  removeBackBtn?: boolean;
  handleClose?: () => void;
  handleCancel?: () => void;
  handleBackBtn?: () => void;
  handleConfirm?: () => void;
  buttonsNames?: { action?: string; cancel?: string };
  loading?: boolean;
  removePadding?: boolean; 
  haveExtraPadding?: boolean;
}

export const CommonModal: React.FC<ModalProps> = ({
  open,
  title = "تقرير منتجات",
  children,
  hasActions,
  removeBackBtn = false,
  handleClose,
  // handleCancel,
  handleBackBtn,
  handleConfirm,
  buttonsNames, icon,
  loading = false,
  removePadding,haveExtraPadding = false,
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
        <StyledModalBox>
          <StyledModalHeader
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box component="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center",gap:1  }}>{icon ? icon : null}   <Typography variant={"h4"} color="grey.900">
              {t(title)}
            </Typography></Box>
            {!removeBackBtn && (
              <BackButton
                position="relative"
                onClick={handleBackBtn || handleClose}
              />
            )}
          </StyledModalHeader>
          <StyledModalMainContainer removePadding={removePadding} haveExtraPadding={haveExtraPadding} >
            {children}
            {/* for custom actions, pass them to children and hasActions as false */}
            {hasActions && (
              <ActionsContainer spacing={2} direction="row">
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
                  color="primary"
                  onClick={() => {
                    handleClose && handleClose();
                  }}
                />
              </ActionsContainer>
            )}
          </StyledModalMainContainer>
        </StyledModalBox>
      </Fade>
    </Modal>
  );
};
