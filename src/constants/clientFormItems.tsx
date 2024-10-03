import { TFunction } from "i18next";
import {
  Document,
  Location,
  NoteAdd,
  Profile,
  ShieldSecurity,
  Sms,
} from "iconsax-react";

export const clientFields = (t: TFunction<"translation", undefined>) => [
  {
    label: t("client.form.name"),
    name: "name",
    startIcon: <Profile variant="TwoTone" />,
  },
  {
    label: t("client.form.phone"),
    name: "phone",
  },
  {
    label: t("client.form.email"),
    name: "email",
    startIcon: <Sms variant="TwoTone" />,
  },
  {
    label: t("client.form.taxRecord"),
    name: "taxRecord",
    startIcon: <ShieldSecurity variant="TwoTone" />,
  },
  {
    label: t("client.form.commercialRecord"),
    name: "commercialRecord",
    startIcon: <Document variant="TwoTone" />,
  },
  {
    label: t("client.form.address"),
    name: "address",
    startIcon: <Location variant="TwoTone" />,
  },
  {
    label: t("client.form.notes"),
    name: "notes",
    startIcon: <NoteAdd variant="TwoTone" />,
  },
];
