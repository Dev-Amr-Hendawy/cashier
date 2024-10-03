import zod from "zod";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import { Card, WalletMoney } from "iconsax-react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { CoupledInput, CoupledTextField, CoupledButton } from "@myCash/common";
import { ModalActionsButtons } from "@myCash/components/endShiftModal";

interface RegisterEndShiftCashProps {
  handleClose: () => void;
  submitHandler: (values: { endCash: string; endVisa: string }) => void;
  isPending: boolean;
}

export const RegisterEndShiftCash: React.FC<RegisterEndShiftCashProps> = ({
  handleClose,
  submitHandler,
  isPending,
}) => {
  const { t } = useTranslation();
  const validationSchema = zod.object({
    endCash: zod
      .number({
        required_error: t("validation.required"),
        invalid_type_error: t("validation.pattern3"),
      })
      .min(0),
    endVisa: zod
      .number({
        required_error: t("validation.required"),
        invalid_type_error: t("validation.pattern3"),
      })
      .min(0),
  });
  return (
    <Stack gap={"1rem"}>
      <Typography variant="subtitle2" color={"grey.600"}>
        {t("beginShift.register-start-cash")}
      </Typography>
      {/* form */}

      <Formik
        initialValues={{ endCash: "", endVisa: "" }}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={(v) => {
          submitHandler(v);
        }}
      >
        {({ handleSubmit }) => (
          <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
            <CoupledInput
              gridStyle="1fr 8fr"
              leftField={
                <CoupledButton
                  title={<WalletMoney size="32" color="#232773" />}
                  disabled
                />
              }
              rightField={
                <CoupledTextField
                  disableNotchedOutline
                  name="endCash"
                  placeholder={t("beginShift.cashMoney")}
                  order="second"
                  type="number"
                />
              }
            />
            <CoupledInput
              gridStyle="1fr 8fr"
              leftField={
                <CoupledButton
                  title={<Card size="32" color="#232773" />}
                  disabled
                />
              }
              rightField={
                <CoupledTextField
                  disableNotchedOutline
                  name="endVisa"
                  placeholder={t("beginShift.visaMoney")}
                  order="second"
                  type="number"
                />
              }
            />
            <ModalActionsButtons
              isPending={isPending}
              handleClose={handleClose}
              endShiftSubmit={handleSubmit}
            />
          </Stack>
        )}
      </Formik>
    </Stack>
  );
};
