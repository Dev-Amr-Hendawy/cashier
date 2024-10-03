import { Stack } from "@mui/material";
import Button from "../form/Button";
import { FormEvent } from "react";
import { useTranslation } from "react-i18next";

interface CalculatorActionsButtonsProps {
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  resetCalculatorValue?: () => void;
}

export const CalculatorActionsButtons: React.FC<
  CalculatorActionsButtonsProps
> = ({ handleSubmit }) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="secondary"
        text={t("confirm")}
        type="submit"
        onClick={handleSubmit}
      />
      {/* <Button
        variant="outlined"
        color="secondary"
        text={t("cancel")}
        onClick={resetCalculatorValue}
      /> */}
    </Stack>
  );
};
