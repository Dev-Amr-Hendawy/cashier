import { Box, Stack } from "@mui/material";
import { MoreSquare } from "iconsax-react";
import "./styles.scss";

type headerWithMoreIconWithOutTitleProps = {
  // title: string;
  onClick?: () => void;
  hideMore?: boolean;
};

export const HeaderWithMoreIconWithOutTitle: React.FC<
  headerWithMoreIconWithOutTitleProps
> = ({
  // title,
  onClick,
  hideMore,
}) => {
  return (
    <Stack className="header-more-container">
      <Box
        sx={{
          transform: "rotate(90deg)",
          height: "35px",
        }}
      >
        {!hideMore && (
          <MoreSquare variant="Outline" color="var(--grey-900)" onClick={onClick} />
        )}
      </Box>
    </Stack>
  );
};
