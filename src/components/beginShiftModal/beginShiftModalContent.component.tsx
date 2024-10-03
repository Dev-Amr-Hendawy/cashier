import { Backdrop, Fade, Modal, Typography } from "@mui/material";
import {
  ShiftModalBranch,
  ShiftModalInfo,
  StyledModalBox,
  StyledModalHeader,
  StyledModalMainContainer,
} from "@myCash/common";
import { useTranslation } from "react-i18next";
import { RegisterShiftCash, ShiftCashInfo } from "@myCash/components";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { useGetInfo } from "@myCash/hooks";
import { useState } from "react";

interface BeginShiftModalContentProps {}

export const BeginShiftModalContent: React.FC<
  BeginShiftModalContentProps
> = () => {
  const accountInfo = useSelector((state: RootState) => state.user?.user);
  const { t } = useTranslation();
  const { data, isPending: getShiftPending } = useGetInfo();
  const [shortage, setShortage] = useState(0);
  const shortageHandler = shortage
    ? Math.max(
        0,
        (data?.data?.lastShift
          ? Number(data?.data?.lastShift?.endCash) +
            Number(data?.data?.lastShift?.endVisa)
          : 0) - shortage
      )
    : 0;
  return (
    <Modal
      open={accountInfo?.isCompleteShitInfo === 0}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={accountInfo?.isCompleteShitInfo === 0}>
        <StyledModalBox>
          <Backdrop open={getShiftPending} />
          <StyledModalHeader
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant={"h4"} color="grey.900">
              {t("beginShift.title")}
            </Typography>
          </StyledModalHeader>
          <StyledModalMainContainer>
            <ShiftModalInfo
              userName={data?.data?.name||data?.data?.accountInfo?.commercialRecordName || ""}
              userRole={
                data?.data?.type == 2
                  ? t("users.form.cashier")
                  : t("users.form.admin")
              }
              shiftType="begin"
            />
            <ShiftModalBranch shiftType="begin" />
            <ShiftCashInfo
              cash={
                data?.data?.lastShift ? data?.data?.lastShift?.endCash : "0.0"
              }
              visa={
                data?.data?.lastShift ? data?.data?.lastShift?.endVisa : "0.0"
              }
              shortage={shortageHandler}
            />
            <RegisterShiftCash
              shortageAmountHandler={(amount: number) => setShortage(amount)}
              cash={data?.data?.lastShift ? data?.data?.lastShift?.endCash : 0}
              visa={data?.data?.lastShift ? data?.data?.lastShift?.endVisa : 0}
            />
          </StyledModalMainContainer>
        </StyledModalBox>
      </Fade>
    </Modal>
  );
};
