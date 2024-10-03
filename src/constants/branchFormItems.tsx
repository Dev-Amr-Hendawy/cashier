import { TFunction } from "i18next";
import { Location, Medal, NoteAdd, Shop } from "iconsax-react";

export const branchFormItems = (t: TFunction<"translation", undefined>) => [
  {
    label: t("branches.form.name"),
    name: "name",
    startIcon: <Shop variant="TwoTone" />,
  },
  {
    label: t("branches.form.status"),
    name: "status",
    startIcon: <Medal variant="TwoTone" />,
  },
  {
    label: t("branches.form.phone"),
    name: "phone",
  },
  {
    label: t("branches.form.city"),
    name: "city",
    startIcon: <Location variant="TwoTone" />,
  },
  {
    label: t("branches.form.address"),
    name: "address",
    startIcon: <Location variant="TwoTone" />,
  },
  {
    label: t("branches.form.notes"),
    name: "notes",
    startIcon: <NoteAdd variant="TwoTone" />,
  },
];
