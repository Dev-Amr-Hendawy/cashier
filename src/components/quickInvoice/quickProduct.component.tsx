import { Form, Formik } from "formik";
import { RootState, addProductQuickInvoice, setProductModal } from "../../lib";
import { useDispatch, useSelector } from "react-redux";

import { CommonModal } from "@myCash/common";
import { QuickProductForm } from "./quickProductForm.component";
import { useTranslation } from "react-i18next";
import { useProductValidation } from "@myCash/utils";
import { toFormikValidationSchema } from "zod-formik-adapter";

type initialValuesType = {
  name: string;
  price: string;
  quantity: string;
  taxAvailable: string;
  taxType: string;
  branch_id:string;
};
const initialValues: initialValuesType = {
  name: "",
  price: "",
  quantity: "",
  taxType: "1",
  taxAvailable: "",
  branch_id:"",
};

export const QuickProduct: React.FC = () => {
  const dispatch = useDispatch();
  const productState = useSelector(
    (state: RootState) => state.quickInvoice.productModal
  );
  const user = useSelector((state: RootState) => state.user);
  console.log("user",user);
  
  const handleClose = () => {
    dispatch(setProductModal(false));
  };
  const { t } = useTranslation();
  const title = t("productModal.addNewProduct");
  const { addProductSchema } = useProductValidation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(v, actions) => {
        const values = v;
        values.branch_id=`${user?.mainBranch?.id}`
        if (v.taxType === "0") {
          values.taxAvailable = "2";
        } else {
          values.taxAvailable = "1";
        }
        dispatch(addProductQuickInvoice(values));
        actions.resetForm();
        handleClose();
      }}
      validationSchema={toFormikValidationSchema(addProductSchema)}
    >
      {({ handleSubmit, resetForm }) => (
        <Form>
          <CommonModal
            open={productState}
            hasActions
            title={title}
            handleClose={() => {
              resetForm();
              handleClose();
            }}
            handleConfirm={handleSubmit}
          >
            <QuickProductForm />
          </CommonModal>
        </Form>
      )}
    </Formik>
  );
};
