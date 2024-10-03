import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const useCustomPrint = () => {
  const printerRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printerRef.current,
  });
  return { printerRef, handlePrint };
};
