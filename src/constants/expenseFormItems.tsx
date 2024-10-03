import { TFunction } from "i18next";
import {
  Calendar2,
  ClipboardImport,
  MoneySend,
  NoteAdd,
  NoteText,
  Paperclip2,
} from "iconsax-react";

export const expenseFormItems = (t: TFunction<"translation", undefined>) => [
  {
    label: t("expenses.form.expense"),
    name: "statement",
    startIcon: <ClipboardImport variant="TwoTone" />,
  },
  {
    label: t("expenses.form.amount"),
    name: "amount",
    startIcon: <MoneySend variant="TwoTone" />,
  },
  {
    label: t("expenses.form.date"),
    name: "date",
    startIcon: <Calendar2 variant="TwoTone" />,
  },
  {
    label: t("expenses.form.notes"),
    name: "note",
    startIcon: <NoteText variant="TwoTone" />,
  },
  {
    label: t("expenses.form.extraInfo"),
    name: "additional_info",
    startIcon: <NoteAdd variant="TwoTone" />,
  },
  {
    label: t("expenses.form.attachment"),
    name: "file",
    startIcon: <Paperclip2 variant="TwoTone" />,
  },
];
