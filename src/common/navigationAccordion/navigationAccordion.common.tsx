import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from "@mui/material";
import { ArrowLeft2, ArrowRight2, ArrowUp, Money2 } from "iconsax-react";
import "./styles.scss";
import i18n from "@myCash/i18n";
import { DrawerLink } from "../drawerLink";
import { ReactNode, useState } from "react";

interface NavigationAccordionProps {
  children: ReactNode;
  title: string;
  accordionIcon?: ReactNode;
}

export const NavigationAccordion: React.FC<NavigationAccordionProps> = ({
  children,
  title,
  accordionIcon,
}) => {
  const { language } = i18n;
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      className="reports-navgation-accordion"
      disableGutters
    >
      <AccordionSummary
        expandIcon={
          language === "ar" ? (
            <ArrowLeft2
              size={16}
              color={
                expanded === "panel1" ? "var(--grey-0)" : "var(--grey-900)"
              }
            />
          ) : (
            <ArrowRight2
              size={16}
              color={
                expanded === "panel1" ? "var(--grey-0)" : "var(--grey-900)"
              }
            />
          )
        }
        className={`reports-navigation ${
          language === "ar"
            ? "reports-navigation--ar"
            : "reports-navigation--en"
        } ${expanded === "panel1" ? "reports-navigation--expanded" : ""}`}
      >
        {accordionIcon && accordionIcon}
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
<Stack gap={1}>
  {/* <ArrowUp />
   */}
  <DrawerLink icon={<Money2 />} title="tesst" link="/reports" />
  <ArrowUp />
  <ArrowUp />
  <ArrowUp />
  <ArrowUp />
  <ArrowUp />
</Stack>;
