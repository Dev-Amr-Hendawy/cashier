import EyeIcon from "@myCash/components/ui/icons/EyeIcon";
import LockIcon from "@myCash/components/ui/icons/LockIcon";
import { TFunction } from "i18next";

export const changePasswordFormItems = (
  t: TFunction<"translation", undefined>
) => [
  {
    name: "password",
    type: "password",
    label: t("accountSecurity.newPassword"),
    startIcon: <LockIcon />,
    endIcon: <EyeIcon />,
  },
  {
    name: "rePassword",
    type: "password",
    label: t("accountSecurity.confirmPassword"),
    startIcon: <LockIcon />,
    endIcon: <EyeIcon />,
  },
];
