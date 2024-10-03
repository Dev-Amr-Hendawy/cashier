// import { Box } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import { CalendarCircle } from "iconsax-react";
// import { CommonModal, RadioLabel } from "@myCash/common";
// import DatePicker from "../form/DatePicker";
// import { useDispatch } from "react-redux";
// import { setPaymentDate } from "@myCash/lib";
// import { useState } from "react";
// import { format } from "date-fns";

// interface NotificationCreditModalProps {
//   open: boolean;
//   handleClose: () => void;
// }

// export const NotificationCreditModal: React.FC<
//   NotificationCreditModalProps
// > = ({ handleClose, open }) => {
//   const { t } = useTranslation();
//   const [date, setDate] = useState<string>("");
//   const dispatch = useDispatch();
//   return (
//     <CommonModal
//       title={t("payment.date-credit-payment")}
//       hasActions={true}
//       open={open}
//       buttonsNames={{ action: t("add"), cancel: t("cancel") }}
//       handleClose={handleClose}
//       handleConfirm={() => {
//         dispatch(setPaymentDate(date));
//         handleClose();
//       }}
//     >
//       <Box
//         sx={{
//           "& .MuiTypography-root": {
//             fontSize: "1.25rem",
//           },
//         }}
//       >
//         <RadioLabel
//           title={t("payment.creditPaymentDate")}
//           icon={<CalendarCircle size="32" color="#2D2D2D66" />}
//         />
//       </Box>
//       <DatePicker
//         disablePast
//         onChange={(date) => setDate(format(date, "dd-MM-yyy"))}
//         fullWidth
//       />
//     </CommonModal>
//   );
// };
