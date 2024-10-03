import { ConfirmOptions } from "material-ui-confirm";

export const defaultDialogOptions: ConfirmOptions = {
  buttonOrder: ["confirm", "cancel"],
  titleProps: {
    color: "primary",
    variant: "h5",
  },
  contentProps: {
    sx: {
      "& .MuiDialogContentText-root": {
        color: "error.main",
      },
    },
  },
  dialogProps: {
    sx: {
      "& .MuiDialog-paper": {
        borderRadius: "1rem",
        maxWidth: "400px",
      },
    },
  },
  confirmationButtonProps: {
    variant: "text",
    size: "small",
  },
  cancellationButtonProps: {
    variant: "text",
    size: "small",
  },
};
