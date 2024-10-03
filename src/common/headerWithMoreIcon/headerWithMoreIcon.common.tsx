import { Box, Stack, Typography } from "@mui/material";
import { More } from "iconsax-react";
import "./styles.scss";

type HeaderWithMoreIconProps = {
  title: string;
  onClick?: () => void;
  hideMore?: boolean;
};

export const HeaderWithMoreIcon: React.FC<HeaderWithMoreIconProps> = ({
  title,
  onClick,
  hideMore,
}) => {
  return (
    <Stack className="header-more-container">
      <Typography variant={"h4"} color="grey.900">
        {title}
      </Typography>
      <Box
        sx={{
          transform: "rotate(90deg)",
        }}
      >
        {!hideMore && (
          <More variant="Outline" color="var(--grey-900)" onClick={onClick} />
        )}
      </Box>
    </Stack>
  );
};
