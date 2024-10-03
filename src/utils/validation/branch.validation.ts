import { useGeneralFields } from "./generalFields";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export const useAddBranchValidation = () => {
  const { t } = useTranslation();
  const { phone } = useGeneralFields();
  const branchValidation = z.object({
    name: z.string({
      required_error: t("validation.required"),
    }),
    phone: phone,
    city: z.string({
      required_error: t("validation.required"),
    }),
    status: z.enum(["1", "2"]),
  });
  return { branchValidation };
};
