import { useTranslation } from "react-i18next";
import { z } from "zod";

export const useUpdateSystemInfoValidation = () => {
  const { t } = useTranslation();

  const systemInfoUpdateSchema = z.object({
    commercialRecordName: z
      .string({
        required_error: t("validation.required"),
      })
      .max(150, t("validation.maxCharacters", { max: 150 })),
    commercialRecord: z
    .string({
      required_error: t("validation.required"),
    })
    .length(10, t("validation.exactCharacters", { exact: 10 }))
    .regex(/^\d+$/, t("validation.onlyNumbers")),
   
    taxRecord: z
    .string({
      required_error: t("validation.required"),
    })
    .length(15, t("validation.exactCharacters", { exact: 15 }))
    .regex(/^\d+$/, t("validation.onlyNumbers")),
    
    tax: z
    .string({
      required_error: t("validation.required"),
    })
    .max(2, t("validation.maxCharacters", { max: 2 }))
    .regex(/^\d+$/, t("validation.onlyNumbers")),
     });

  return { systemInfoUpdateSchema };
};
