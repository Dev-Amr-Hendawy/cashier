import { Stack } from "@mui/material";
import "./styles.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <Stack className="main-layout-container">{children}</Stack>;
};
