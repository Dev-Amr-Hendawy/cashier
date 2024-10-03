import { BeginShiftModalContent } from "@myCash/components";
// import { useGetCurrentShift } from "@myCash/hooks/use-get-begin-shift";

interface BeginShiftModalHocProps {}

export const BeginShiftModalHoc: React.FC<BeginShiftModalHocProps> = () => {
  // const { data, isSuccess } = useGetCurrentShift();
  // // check if user has previous shift data
  // const checkAvailableShift = () => {
  //   const shiftData = data?.data;
  //   if (isSuccess) {
  //     return {
  //       cash: shiftData?.cash ? shiftData.cash : 0,
  //       visa: shiftData?.visa ? shiftData.visa : 0,
  //     };
  //   }
  //   return { cash: 0, visa: 0 };
  // };

  return <BeginShiftModalContent />;
};
