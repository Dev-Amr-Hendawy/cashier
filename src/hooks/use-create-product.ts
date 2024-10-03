import { createProduct, updateProduct } from "../apis";

import { editInitialValuesType } from "../types/types";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "@myCash/constants";
import { useDispatch } from "react-redux";
import { clearCart, productsActions } from "@myCash/lib";

export const useCreateProduct = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: (values: editInitialValuesType) => createProduct(values),
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const updateMutation = useMutation({
    mutationFn: (values: editInitialValuesType) => updateProduct(values),
    onSuccess: (data) => {
      if (data?.status === 1) {
        toast.success("Product updated successfully");
        queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
        dispatch(clearCart());
        dispatch(productsActions.closeProductsForm());
      }
    },
  });

  return { createMutation, updateMutation };
};
