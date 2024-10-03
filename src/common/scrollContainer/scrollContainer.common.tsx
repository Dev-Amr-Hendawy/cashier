import { Box } from "@mui/material";
import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";

type ScrollContainerProps = {
  children: React.ReactNode;
  hasMargin?: boolean;
};

export const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  hasMargin,
}) => {
  const haveHeader = useSelector(
    (state: RootState) => state.subscriptionWarning.haveHeader
  );
  return (
    <Box
      sx={{
        height: haveHeader? "calc(100vh - 12rem)":"calc(100vh - 6rem)",
        overflowY: "auto",
        margin: hasMargin ? "0 auto" : "0",
        padding: hasMargin ? "2rem 0" : "0",
      }}
    >
      {children}
    </Box>
  );
};
