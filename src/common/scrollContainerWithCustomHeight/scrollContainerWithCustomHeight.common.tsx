import { Box } from "@mui/material";
import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";

type scrollContainerWithCustomHeightProps = {
  children: React.ReactNode;
  hasMargin?: boolean;
  height?: string;
  removeHeight?: number;
  customStyle?: object;
};

export const ScrollContainerWithCustomHeight: React.FC<
  scrollContainerWithCustomHeightProps
> = ({ children, hasMargin, height, removeHeight, customStyle }) => {
  const haveHeader = useSelector(
    (state: RootState) => state.subscriptionWarning.haveHeader
  );
  return (
    <Box
      sx={{
        height: height
          ? height
          : removeHeight
          ? haveHeader
            ? `calc(100vh - ${removeHeight + 6}rem)`
            : `calc(100vh - ${removeHeight}rem)`
          : haveHeader
          ? "calc(100vh - 12rem)"
          : "calc(100vh - 5.5rem)",
        overflowY: "auto",
        position: "relative",
        margin: hasMargin ? "0 auto" : "0",
        padding: hasMargin ? "2rem 0" : "0",
        ...customStyle,
      }}
    >
      {children}
    </Box>
  );
};
