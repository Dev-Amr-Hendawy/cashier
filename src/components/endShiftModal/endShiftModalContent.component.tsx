import { Backdrop } from "@mui/material";
import {
  CommonModal,
  ShiftCashInfo,
  ShiftModalBranch,
  ShiftModalInfo,
} from "@myCash/common";
import { useTranslation } from "react-i18next";
import { RegisterEndShiftCash } from "@myCash/components";
import { useLogout } from "@myCash/hooks";
import "./styles.scss";
import { useGetCurrentShift } from "@myCash/hooks/use-get-begin-shift";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
interface EndShiftModalContentProps {
  open: boolean;
  handleClose: () => void;
}
// TODO:: refac
export const EndShiftModalContent: React.FC<EndShiftModalContentProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const { mutate, isPending } = useLogout();
  const submitHandler = (values: { endCash: string; endVisa: string }) => {
    mutate(values);
  };
  const { data, isPending: getShiftPending } = useGetCurrentShift();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <CommonModal
      title="endShift.title"
      hasActions={false}
      open={open}
      handleClose={() => {
        handleClose();
      }}
    >
      {/* <StyledModalBox> */}
      <Backdrop open={getShiftPending} />
      {/* <StyledModalHeader
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"h4"} color="grey.900">
          {t("endShift.title")}
        </Typography>
      </StyledModalHeader> */}
      {/* <StyledModalMainContainer> */}
      <ShiftModalInfo
        userName={user?.name || ""}
        userRole={
          user?.type == 2 ? t("users.form.cashier") : t("users.form.admin")
        }
        shiftType="end"
      />
      <ShiftModalBranch shiftType="end" />
      <ShiftCashInfo
        cash={data?.data?.startCash || "0.0"}
        visa={data?.data?.startVisa || "0.0"}
      />
      <RegisterEndShiftCash
        handleClose={handleClose}
        submitHandler={submitHandler}
        isPending={isPending}
      />
      {/* </StyledModalMainContainer> */}
      {/* </StyledModalBox> */}
    </CommonModal>
    //   </Fade>
    // </Modal>
  );
};
// <Modal
//   open={open}
//   onClose={() => handleClose()}
//   closeAfterTransition
//   slots={{ backdrop: Backdrop }}
//   slotProps={{
//     backdrop: {
//       timeout: 500,
//     },
//   }}
// >
//   <Fade in={open}>
