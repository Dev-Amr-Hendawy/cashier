import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CommonModal, ProductForm } from "..";
import { PRODUCTS_QUERY_KEY } from "../../constants";
import { useCreateProduct, useCustomFilter, useGetBranches } from "../../hooks";
import { productsActions } from "../../lib/store/slices/products-slice";
import { RootState } from "../../lib";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useProductValidation } from "@myCash/utils";
import { Category } from "@myCash/types";
type initialValuesType = {
  product_id?: string;
  image: string;
  name: string;
  desc: string;
  barCode: string;
  price: string;
  quantity: string;
  category: string;
  hasDiscount: "0" | "1" | "";

  discountType: string;
  discount: string;
  taxAvailable: string;
  taxType: string;
  parentCat_id: string;
  cat_id: string;
  product_add_sort: string[] | null | string;
  defaultCategory: Category | undefined;
  buyPrice: string;
  buyTaxAvailable: string;
  buyTaxType: string;
};
const initialValues: initialValuesType = {
  image: "",
  name: "",
  desc: "",
  barCode: "",
  price: "",
  quantity: "",
  category: "",
  hasDiscount: "",
  discountType: "",
  discount: "",
  taxType: "0",
  taxAvailable: "2",
  parentCat_id: "",
  cat_id: "",
  product_add_sort: "",
  defaultCategory: undefined,
  buyPrice: "",
  buyTaxAvailable: "2",
  buyTaxType: "0",
};

export const ProductModal: React.FC = () => {
  const dispatch = useDispatch();
  const productState = useSelector(
    (state: RootState) => state.products.productsForm
  );

  const handleClose = () => {
    dispatch(productsActions.closeProductsForm());
  };
  const { t } = useTranslation();
  const title = initialValues.product_id
    ? t("productModal.editProduct")
    : t("productModal.addNewProduct");

  const { createMutation } = useCreateProduct();
  const queryClient = useQueryClient();
  const { addProductSchema } = useProductValidation();
  const branchesFilters = useCustomFilter({
    date_from: "",
    date_to: "",
    status: "",
    city: "",
  });
  const getBranchesQuery = useGetBranches(branchesFilters.filters);
  const branches = getBranchesQuery.data?.pages?.flat();
  
  const branchesShortData=branches?.map(branch=>({value:branch?.id,label:branch?.name}))


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(addProductSchema)}
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
        }
        if (values.discount) {
          values.hasDiscount = "1";
        } else {
          values.hasDiscount = "0";
        }

        createMutation.mutate(values, {
          onSuccess: () => {
            dispatch(productsActions.closeProductsForm());
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
            open={productState.open}
            hasActions
            title={title}
            handleClose={() => {
              resetForm();
              handleClose();
            }}
            handleConfirm={handleSubmit}
            loading={createMutation.isPending}
          >
            <ProductForm  branchesData={branchesShortData?branchesShortData:[]}  />
          </CommonModal>
        </Form>
      )}
    </Formik>
  );
};
