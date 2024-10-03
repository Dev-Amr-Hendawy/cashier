import { TFunction } from "i18next";
import {
  Location,
  Lock,
  MedalStar,
  NoteAdd,
  Sms,
  TagUser,
} from "iconsax-react";

export const userFormFields = (t: TFunction<"translation", undefined>) => [
  {
    label: t("users.form.name"),
    name: "name",
    startIcon: <TagUser variant="TwoTone" />,
  },
  {
    label: "",
    // TODO:: change to type
    name: "type", //1-admin 2-cashier
    startIcon: <MedalStar variant="TwoTone" />,
  },
  {
    label: t("users.form.phone"),
    name: "phone",
  },
  {
    label: t("users.form.email"),
    name: "email",
    startIcon: <Sms variant="TwoTone" />,
  },
  {
    label: t("users.form.address"),
    name: "address",
    startIcon: <Location variant="TwoTone" />,
  },
  {
    label: t("users.form.password"),
    name: "password",
    startIcon: <Lock variant="TwoTone" />,
  },
  {
    label: t("users.form.notes"),
    name: "notes",
    startIcon: <NoteAdd variant="TwoTone" />,
  },
];
