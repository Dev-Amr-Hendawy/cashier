import { Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { Card, WalletMoney } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { CoupledInput, CoupledTextField } from "../../common";
import { CoupledButton } from "../../common/coupledButton";
import { ActionsContainer } from "../../common/modal/styles";
import { usePostBeginShift } from "../../hooks/use-post-begin-shift";
import { firstLoginHandler } from "../../lib/store/slices/user-slice";
import Button from "../form/Button";

interface RegisterShiftCashProps {
  shortageAmountHandler: (shortage: number) => void;
  visa: number;
  cash: number;
}

export const RegisterShiftCash: React.FC<RegisterShiftCashProps> = ({
  shortageAmountHandler,
  visa,
  cash,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mutate, isPending } = usePostBeginShift();
  const validationSchema = zod.object({
    cash: zod.coerce
      .number({
        required_error: t("validation.required"),
        invalid_type_error: t("validation.pattern3"),
      })
      .min(0),
    visa: zod.coerce
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
        initialValues={{
          cash: "",
          visa: "",
          differentInCash: "",
          differentInVisa: "",
        }}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={(v) => {
          mutate(v);
          dispatch(firstLoginHandler(v));
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
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
                  name="cash"
                  placeholder={t("beginShift.cashMoney")}
                  order="second"
                  type="number"
                  disableNotchedOutline
                  eventHandleChange={(e) => {
                    shortageAmountHandler(
                      Number(e?.target?.value || 0) + Number(values.visa)
                    );
                    setFieldValue("cash", e?.target?.value);
                    setFieldValue(
                      "differentInCash",
                      cash - Number(e?.target?.value)
                    );
                  }}
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
                  name="visa"
                  placeholder={t("beginShift.visaMoney")}
                  order="second"
                  type="number"
                  disableNotchedOutline
                  eventHandleChange={(e) => {
                    shortageAmountHandler(
                      Number(e?.target?.value || 0) + Number(values.cash)
                    );
                    setFieldValue("visa", e?.target?.value);
                    setFieldValue(
                      "differentInVisa",
                      visa - Number(e?.target?.value)
                    );
                  }}
                />
              }
            />
            <ActionsContainer spacing={2} direction="row" width={"100%"}>
              <Button
                text={t("beginShift.start")}
                variant="contained"
                color="secondary"
                type="submit"
                onClick={() => handleSubmit()}
                loading={isPending}
              />
            </ActionsContainer>
          </Stack>
        )}
      </Formik>
    </Stack>
  );
};
