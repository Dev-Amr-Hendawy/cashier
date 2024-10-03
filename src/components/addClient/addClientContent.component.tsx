import { Form, Formik, FormikHelpers } from "formik";

import { AddClientProvider } from "../../context";
import Button from "../form/Button";
import { ClientFormContent } from "..";
import { CommonModal } from "../../common";
import { FaPlus } from "react-icons/fa6";
import { Product } from "../../types/types";
import { setClientInvoice } from "@myCash/lib";
import { toast } from "react-toastify";
import { useAddClient } from "../../hooks/clients/useAddClient.hook";
import { useDispatch } from "react-redux";

type AddClientProps = {
  cartState: {
    products: Product[];
  };
  t: (text: string) => string;
  handleOpen?: () => void;
  open: boolean;
  handleClose: () => void;
  hideButtonHandler?: boolean;
  buttonsNames?: { action?: string; cancel?: string };
};
type FormValues = {
  name: string;
  country_id: string;
  email: string;
  phone: string;
  taxRecord: string;
  type: string;
  commercialRecord: string;
  address: string;
  notes: string;
  id: string;
};

// TODO:: refac and move to common
export const AddClientContent: React.FC<AddClientProps> = ({
  t,
  cartState,
  handleOpen,
  open,
  handleClose,
  hideButtonHandler,
  buttonsNames,
}) => {
  const { mutate } = useAddClient();
  const dispatch = useDispatch();
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (values?.id) {
      dispatch(setClientInvoice(values));
      handleClose();
      return;
    }
    mutate(values, {
      onSuccess: (res) => {
        if (res?.data?.status !== 1) {
          actions.setSubmitting(false);
          // toast.error(res?.data?.message || t("client.addClientError"), {
          //   toastId: "addClientError",
          // });
        } else {
          actions.setSubmitting(false);
          toast.success(res?.data?.message || t("client.addClientSuccess"), {
            toastId: "addClientSuccess",
          });
          dispatch(setClientInvoice(res?.data?.data));
          actions.resetForm();
          handleClose();
        }
      },
      onError: (response) => {
        actions.setSubmitting(false);
        toast.error(response?.message, {
          toastId: "addClientError",
        });
      },
    });
  };
  return (
    <Formik
      initialValues={{
        id: "",
        name: "",
        country_id: "1",
        email: "",
        phone: "",
        taxRecord: "",
        type: "1",
        commercialRecord: "",
        address: "",
        notes: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, resetForm }) => (
        <AddClientProvider>
          <Form style={{ width: "100%" }}>
            {!hideButtonHandler && (
              <Button
                variant="contained"
                text={t("cart.addClient")}
                startIcon={<FaPlus />}
                maxWidth="13rem"
                disabled={cartState.products.length === 0}
                onClick={handleOpen}
              />
            )}
            <CommonModal
              open={open}
              hasActions={false}
              title={t("client.addClient")}
              handleConfirm={handleSubmit}
              removeBackBtn
              buttonsNames={buttonsNames}
            >
              <ClientFormContent
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                handleReset={() => {
                  resetForm();
                  handleClose();
                }}
              />
            </CommonModal>
          </Form>
        </AddClientProvider>
      )}
    </Formik>
  );
};
