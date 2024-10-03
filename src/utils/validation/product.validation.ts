import { useGeneralFields } from "./generalFields";
import { z } from "zod";
export const useProductValidation = () => {
  const { name, numberRequiredNoZero } = useGeneralFields();
  const addProductSchema = z.object({
    name: name,
    price: numberRequiredNoZero,
    quantity: numberRequiredNoZero,
   
  });

  return { addProductSchema };
};
