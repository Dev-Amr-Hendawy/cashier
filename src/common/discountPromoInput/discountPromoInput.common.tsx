import { Stack, Typography } from "@mui/material";
import Button from "@myCash/components/form/Button";
import TextField from "@myCash/components/form/TextField";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import i18n from "@myCash/i18n";
import { TicketDiscount } from "iconsax-react";
interface DiscountPromoInputProps {
  submitHandler: (values: { [key: string]: string }) => void;
  helperText?: string;
}

export const DiscountPromoInput: React.FC<DiscountPromoInputProps> = ({
  submitHandler,
  helperText,
}) => {
  const { t } = useTranslation();
  const dir = i18n.dir();
  // const discount = useSelector(
  //   (state: RootState) => state.subscription.subscriptionPayment.influencer_id
  // );
  return (
    <Formik
      initialValues={{
        code: "",
      }}
      onSubmit={submitHandler}
    >
      {({ handleSubmit, values }) => {
        return (
          <Stack className="discount-promo-input"
            sx={{
              "& .MuiButtonBase-root:not(.Mui-disabled)": {
                bgcolor: 'var(--primary-main)',
                color:"#fff"
              },
              "& .MuiOutlinedInput-root": {
                paddingLeft: dir === "ltr" ? "0px !important" : "",
                paddingRight: dir === "rtl" ? "0px !important" : ""
              } ,"& .MuiButtonBase-root": {
                color:"#fff",
                borderRadius:"0 999rem 999rem 0 !important"
              },
            }}
          >
            <Typography
              fontSize={"1.25rem"}
              fontWeight={400}
              color={"var(--grey-600)"}
            >
              {" "}
              {helperText ? t(helperText) : ""}
            </Typography>
            <TextField
              label={t("subscriptions.enterCouponCode")}
              name="code"
              startIcon={<TicketDiscount  />}
              endIcon={
                <Button
                  text={t("apply")}
                  disabled={!values.code}

                  variant="contained"
                  color="primary"

                  onClick={handleSubmit}
                  width="20%"
                />
              }
            />
          </Stack>
        );
      }}
    </Formik>
  );
};
