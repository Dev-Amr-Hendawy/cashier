import { useGeneralFields } from "./generalFields";
import { z } from "zod";
export const useUserValidation = () => {
  const { phone, password, name, email, emailNotRequired } = useGeneralFields();
  const addUserSchema = z.object({
    phone: phone,
    password: password,
    name: name,
    email: email,
    type: phone,
  });
  const editUserSchema = z.object({
    // phone: phoneOptional,
    phone: phone,
    email: emailNotRequired,
  });
  return { addUserSchema, editUserSchema };
};
