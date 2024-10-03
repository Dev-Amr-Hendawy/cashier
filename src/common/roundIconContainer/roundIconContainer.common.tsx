import { Stack } from "@mui/material";
import { ReactNode } from "react";
import "./styles.scss";

interface RoundIconContainerProps {
  icon: ReactNode;
}

export const RoundIconContainer: React.FC<RoundIconContainerProps> = ({
  icon,
}) => {
  return <Stack className="round-icon-container">{icon}</Stack>;
};
