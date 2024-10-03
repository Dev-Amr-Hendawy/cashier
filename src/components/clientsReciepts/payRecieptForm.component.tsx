import "./styles.scss";

import { CoupledButton, CoupledInput, CoupledTextField } from "@myCash/common";
import {
  RECEIPTS_QUERY_KEY,
  SINGLE_RECEIPT_QUERY_KEY,
} from "@myCash/constants";
import { Receipt, ReceiptsData } from "@myCash/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DatePicker from "../form/DatePicker";
import { Formik } from "formik";
import { MoneyTime } from "iconsax-react";
import { RecieptModalActions } from "@myCash/components";
import { Stack } from "@mui/material";
import { payReceipts } from "@myCash/apis";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PayRecieptFormProps {
  handleClose: () => void;
  fullAmount?: number;
  receipt: Receipt;
}

export const PayRecieptForm: React.FC<PayRecieptFormProps> = ({
  handleClose,
  receipt,
}) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<string>("");
  // const receiptState = useSelector((state: RootState) => state.receipt);
  // const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (values: ReceiptsData) => payReceipts(values),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [RECEIPTS_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [SINGLE_RECEIPT_QUERY_KEY],
      });
      toast.success(res?.data?.message, {
        toastId: "payReceiptSuccess",
      });
      handleClose();
    },
    onError: (e) => {
      toast.error(e.message || t("error.somethingWentWrong"), {
        toastId: "payReceiptError",
      });
    },
  });
  return (
    <Formik
      initialValues={{
        cashPrice: "",
        visaPrice: "",
        date: date,
        receipt_id: String(receipt.id),
      }}
      // validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={(v) => {
        if (
          Number(receipt.amount) <
          Number(v.cashPrice) + Number(v.visaPrice)
        ) {
          toast.error(t("error.paidAmountExceeds"), {
            toastId: "payReceiptError",
          });
          return;
        } else {
          mutate(v);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
          className="reciept-form-inputs"
        >
          <CoupledInput
            gridStyle="1fr 8fr"
            leftField={
              <CoupledButton
                title={<MoneyTime size="32" color="#232773" />}
                disabled
              />
            }
            rightField={
              <CoupledTextField
                name="cashPrice"
                placeholder={t("beginShift.cashMoney")}
                order="second"
                disableNotchedOutline
              />
            }
          />
          <CoupledInput
            gridStyle="1fr 8fr"
            leftField={
              <CoupledButton
                title={<MoneyTime size="32" color="#232773" />}
                disabled
              />
            }
            rightField={
              <CoupledTextField
                name="visaPrice"
                placeholder={t("beginShift.visaMoney")}
                order="second"
                disableNotchedOutline
              />
            }
          />
          {/* <TextField
            label={t("paymentInvoice.remaining")}
            name="remainingText"
            placeholder="المتبقي"
            readonly
            endIcon={remaining}
          /> */}
          <Stack width={"100%"}>
            <DatePicker
              onChange={(date) => setDate(date.toLocaleDateString("en-GB"))}
              fullWidth
              disablePast
            />
          </Stack>

          <RecieptModalActions
            isPending={isPending}
            handleClose={handleClose}
            submitRecieptPayment={handleSubmit}
          />
        </Stack>
      )}
    </Formik>
  );
};
