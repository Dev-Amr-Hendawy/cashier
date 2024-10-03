import { PostBeginShiftResponse } from "../types/types";
import { firstLoginHandler } from "../lib/store/slices/user-slice";
import { postBeginShiftApi } from "../apis";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CURRENT_SHIFT_QUERY_KEY } from "@myCash/constants";
import { ACCOUNT_QUERY_KEY } from "@myCash/constants";

export const usePostBeginShift = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const handleSuccess = (data: PostBeginShiftResponse) => {
    if (data.status === 0) {
      toast.error(data?.message, {
        toastId: "begin-shift-error",
      });
    } else if (data.status === 1) {
      queryClient.invalidateQueries({ queryKey: [CURRENT_SHIFT_QUERY_KEY] });
      toast.success(data?.message, {
        toastId: "begin-shift-success",
      });
      queryClient.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEY] });
    }

    dispatch(firstLoginHandler({}));
  };
  return useMutation({
    mutationFn: (values: { [key: string]: string }) =>
      postBeginShiftApi(values),
    onSuccess: (data) => {
      handleSuccess(data);
    },
  });

  // return { beginShiftMutation };
};
