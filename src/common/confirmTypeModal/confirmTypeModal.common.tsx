import { Formik } from "formik";
import { CommonModalProps } from "@myCash/types";
import { CommonModal, ConfirmUserType } from "@myCash/common";
import { useEditCode } from "@myCash/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { useEffect } from "react";

interface ConfirmTypeModalProps extends CommonModalProps {}

export const ConfirmTypeModal: React.FC<ConfirmTypeModalProps> = ({
  open,
  handleClose,
}) => {
  // TODO:: revise common or component
  const confirmUser = useSelector((state: RootState) => state.confirmUser);
  const checkType =
    confirmUser.updateType === "email"
      ? "2"
      : confirmUser.updateType === "phone"
      ? "1"
      : "";
  const initialValues = {
    email: "",
    phone: "",
    country_id: "1",
  };
  const { mutate, isPending } = useEditCode();

  useEffect(() => {
    !checkType && handleClose();
  }, [checkType, handleClose]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(v) => {
        mutate({ type: checkType, ...v });
      }}
    >
      {({ handleSubmit }) => (
        <CommonModal
          open={open}
          handleClose={handleClose}
          title="checkIdentity"
          hasActions
          loading={isPending}
          handleConfirm={async () => {
            handleSubmit();
          }}
        >
          <ConfirmUserType type={checkType} showBoth={confirmUser.showBoth} />
        </CommonModal>
      )}
    </Formik>
  );
};
