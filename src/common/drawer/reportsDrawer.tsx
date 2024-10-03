import { StatusUp } from "iconsax-react";
import { NavigationAccordion, DrawerLink } from "@myCash/common";
import { Divider, Stack } from "@mui/material";
import { DrawerLinkItem } from "@myCash/types";
import { useTranslation } from "react-i18next";

interface ReportsDrawerProps {
  reportsSubLinks: DrawerLinkItem[];
  handleLinkClick: () => void;
}

export const ReportsDrawer: React.FC<ReportsDrawerProps> = ({
  reportsSubLinks,
  handleLinkClick,
}) => {
  const { t } = useTranslation();
  return (
    <NavigationAccordion
      title={t("reports.title")}
      accordionIcon={<StatusUp variant="TwoTone" color="var(--grey-900)" />}
    >
      <Stack divider={<Divider />}>
        {reportsSubLinks.map((item) => (
          <DrawerLink
            key={item.title}
            {...item}
            handleClick={handleLinkClick}
          />
        ))}
      </Stack>
    </NavigationAccordion>
  );
};
