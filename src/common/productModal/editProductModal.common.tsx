import { CommonModal, ProductForm } from "..";
import { Form, Formik } from "formik";

import { PRODUCTS_QUERY_KEY } from "../../constants";
import { editInitialValuesType } from "../../types/types";
import { useCreateProduct, useCustomFilter, useGetBranches } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  handleClose: () => void;
  initialValues: editInitialValuesType;
};

export const EditProductModal: React.FC<Props> = ({
  open,
  handleClose,
  initialValues,
}) => {
  const { t } = useTranslation();
  const title = t("productModal.editProduct");

  const { updateMutation } = useCreateProduct();
  const queryClient = useQueryClient();
  const branchesFilters = useCustomFilter({
    date_from: "",
    date_to: "",
    status: "",
    city: "",
  });
  const getBranchesQuery = useGetBranches(branchesFilters.filters);
  const branches = getBranchesQuery.data?.pages?.flat();
  
  const branchesShortData=branches?.map(branch=>({value:branch.id,label:branch.name}))

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(v) => {
        const values = v;
        if (
          values.product_add_sort &&
          values.product_add_sort.length > 0 &&
          typeof values.product_add_sort !== "string"
        ) {
          const newCategories = values.product_add_sort.reverse();
          values.category = JSON.stringify(
            newCategories.reduce((acc, curr: string) => {
              return { name: curr, child: acc };
            }, {})
          );
          if (values.defaultCategory) {
            values.parentCat_id = values.defaultCategory?.id.toString();
          }
        } else {
          values.category = "";
          values.parentCat_id = "";
          values.cat_id =
            values?.cat_id || values?.defaultCategory?.id.toString() || "";
        }
        if (values.discount) {
          // /* @ts-expect-error: This is necessary to suppress the TypeScript error */

          values.hasDiscount = "1";
        } else {
          // /* @ts-expect-error: This is necessary to suppress the TypeScript error */

          values.hasDiscount = "0";
        }

        //remove the defaultCategory from the values
        delete values.defaultCategory;
        // /* @ts-expect-error: This is necessary to suppress the TypeScript error */
        updateMutation.mutate(values, {
          onSuccess: () => {
            handleClose();
            queryClient.invalidateQueries({
              queryKey: [PRODUCTS_QUERY_KEY],
            });
          },
        });
      }}
    >
      {({ handleSubmit, resetForm }) => (
        <Form>
          <CommonModal
            open={open}
            hasActions
            title={title}
            handleClose={() => {
              resetForm();
              handleClose();
            }}
            handleConfirm={handleSubmit}
            loading={updateMutation.isPending}
          >
            <ProductForm branchesData={branchesShortData?branchesShortData:[]} />
          </CommonModal>
        </Form>
      )}
    </Formik>
  );
};
