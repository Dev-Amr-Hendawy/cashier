import { useTranslation } from "react-i18next";
import { z } from "zod";
export const useInventoryReportValidation = () => {
  const { t } = useTranslation();
  const inventoryReportSchema = z.object({
    allQuantity: z.coerce
      .number({
        invalid_type_error: t("validation.pattern4"),
      })
      .positive(),
    quantity: z.coerce
      .number({
        invalid_type_error: t("validation.pattern4"),
      })
      .gte(0)
      .optional(),
  });

  return { inventoryReportSchema };
};
