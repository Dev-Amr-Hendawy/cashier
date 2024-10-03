import { Typography } from "@mui/material"
import { InvoiceSettingItem } from "@myCash/common"
import { Refresh2 } from "iconsax-react"
import { useTranslation } from "react-i18next"

interface SettingsResetProps {}

export const SettingsReset: React.FC<SettingsResetProps> = () => {
const {t}=useTranslation()
    return <>
       <Typography variant="h4">{t("settings.resetTitle")}</Typography>
            <InvoiceSettingItem
              name={t("settings.reset")}
              icon={<Refresh2 size={24} />}
            />
    </>
}