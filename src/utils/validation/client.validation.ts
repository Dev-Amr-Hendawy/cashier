import { useGeneralFields } from "./generalFields";
import { z } from "zod";
export const useClientValidation = () => {
  const { name, phone, emailNotRequired, phoneOptional } = useGeneralFields();
  const addClientSchema = z.object({
    name: name,
    phone: phone,
    email: emailNotRequired,
  });

  const editClientSchema = z.object({
    phone: phoneOptional,
    email: emailNotRequired,
  });
  return { addClientSchema, editClientSchema };
};
