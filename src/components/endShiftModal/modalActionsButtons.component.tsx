import { ActionsContainer } from "@myCash/common";
import Button from "../form/Button";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";

interface ModalActionsButtonsProps {
  endShiftSubmit: () => void;
  isPending: boolean;
  handleClose: () => void;
}

export const ModalActionsButtons: React.FC<ModalActionsButtonsProps> = ({
  endShiftSubmit,
  isPending,
  handleClose,
}) => {
  const { t } = useTranslation();
  return (
    <ActionsContainer spacing={2} direction="row" width={"100%"}>
      <Button
        text={t("endShift.end")}
        variant="contained"
        color="error"
        type="submit"
        onClick={endShiftSubmit}
        loading={isPending}
      />
      <Stack className="end-shift-skip">
        <Button
          text={t("endShift.skip")}
          variant="outlined"
          // color="info"
          // type="submit"
          onClick={handleClose}
          // onClick={(event?: React.MouseEvent) => {
          //   event?.stopPropagation();
          //   dispatch(setIsOpen(false));
          // }}
        />
      </Stack>
    </ActionsContainer>
  );
};
