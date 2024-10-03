import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../apis";
import { toast } from "react-toastify";
import { PRODUCTS_QUERY_KEY } from "../constants";
import { useConfirm } from "material-ui-confirm";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { clearCart } from "@myCash/lib";
import { IBaseApiResponse } from "@myCash/types";
import { AxiosError } from "axios";

type Props = {
  id: number;
  handleClose: () => void;
};

export const useDeleteProduct = ({ id, handleClose }: Props) => {
  const { t } = useTranslation();
  const confirm = useConfirm();
  const handleDelete = () => {
    confirm({
      title: t("confirmAction"),
      description: t("confirmDelete"),
      confirmationText: t("confirm"),
      cancellationText: t("cancel"),
    })
      .then(() => {
        mutation.mutate(id);
      })
      .catch(() => {
        handleClose();
      });
  };
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (product_id: number) => deleteProduct(product_id),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [PRODUCTS_QUERY_KEY],
      });
      dispatch(clearCart());
      toast.success(data?.message, {
        toastId: "deleteProduct",
      });
    },
    onError(error: AxiosError<IBaseApiResponse>) {
      toast.error(error?.response?.data?.message || t("error"));
    },
  });

  return { mutation, handleDelete };
};
