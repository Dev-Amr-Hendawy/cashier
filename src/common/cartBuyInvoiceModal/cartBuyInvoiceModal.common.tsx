import { Stack } from "@mui/material";
import { CommonModal } from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setInvoiceType, setSellInvoiceData } from "@myCash/lib";
import { Formik } from "formik";
import { buyInvoiceFormItems } from "@myCash/constants";
import { DatePicker, TextField } from "@myCash/components";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import Button from "@myCash/components/form/Button";
import "./styles.scss";

interface CartBuyInvoiceModalProps {}

// TODO:: move to components
export const CartBuyInvoiceModal: React.FC<CartBuyInvoiceModalProps> = () => {
  const cartState = useSelector((state: RootState) => state.cart);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ referenceNumber: "", referenceDate: "", note: "" }}
      onSubmit={(v) => {
        dispatch(setSellInvoiceData(v));
      }}
    >
      {({ setFieldValue, handleSubmit }) => (
        <CommonModal
          open={
            cartState.invoiceType === 2 &&
            !cartState?.sellInvoiceData?.referenceNumber &&
            !cartState?.sellInvoiceData?.referenceDate
          }
          hasActions={false}
          title="invoice.buyInvoice"
          handleConfirm={handleSubmit}
          removeBackBtn
          handleClose={() => dispatch(setInvoiceType(1))}
        >
          {buyInvoiceFormItems(t).map((field) => {
            if (field.type === "date") {
              return (
                <Stack key={field.name} className="date-picker-container">
                  <DatePicker
                    onChange={(date) =>
                      setFieldValue(
                        "referenceDate",
                        date ? format(date, "yyyy-MM-dd") : ""
                      )
                    }
                    disableFuture
                  />
                </Stack>
              );
            }
            return <TextField key={field.name} {...field} />;
          })}
          <Button
            text={t("confirm")}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          />
        </CommonModal>
      )}
    </Formik>
  );
};
