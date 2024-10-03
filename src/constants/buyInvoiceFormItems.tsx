import { TFunction } from "i18next";
import { Medal, NoteAdd, Shop } from "iconsax-react";

export const buyInvoiceFormItems = (t: TFunction<"translation", undefined>) => [
  {
    label: t("invoice.referenceNumber"),
    name: "referenceNumber",
    startIcon: <Shop variant="TwoTone" />,
    type: "number",
  },
  {
    label: t("invoice.referenceDate"),
    name: "referenceDate",
    startIcon: <Medal variant="TwoTone" />,
    type: "date",
  },
  {
    label: t("expenses.form.notes"),
    name: "note",
    startIcon: <NoteAdd variant="TwoTone" />,
    type: "text",
  },
];
