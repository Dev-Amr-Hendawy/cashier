import { CircularProgress } from "@mui/material";
import "./styles.scss";

interface CirularLoaderProps {
  size: number|string;
  isPageView?: boolean;
}

export const CircularLoader: React.FC<CirularLoaderProps> = ({
  size,
  isPageView,
}) => {
  return (
    <CircularProgress
      size={size}
      className="circular-loader"
      sx={{
        m: isPageView ? "10% 45%" : "auto auto",
      }}
    />
  );
};
