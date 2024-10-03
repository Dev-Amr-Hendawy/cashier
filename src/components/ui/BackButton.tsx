import { Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import i18n from "@myCash/i18n";

type Props = {
  onClick?: () => void;
  position?: "relative" | "absolute";
};

const BackButton = ({ onClick, position }: Props) => {
  const { t } = useTranslation();
  const dir = i18n.dir();
  return (
    <Button
      onClick={onClick}
      sx={{
        position: position ? position : "absolute",
        top: position ? "unset" : "4rem",
        right: {
          xs: position ? "unset" : "2rem",
          xl: position ? "unset" : "4rem",
        },
      }}
    >
      <Stack direction="row" spacing={1} alignItems={"center"}>
        <Typography
          variant="h5"
          sx={{
            textWrap: "nowrap",
          }}
          color={"grey.800"}
        >
          {t("backButton")}
        </Typography>
        {dir === "ltr" ? (
          <ArrowRight2 color="var(--grey-900)" />
        ) : (
          <ArrowLeft2 color="var(--grey-900)" />
        )}
      </Stack>
    </Button>
  );
};

export default BackButton;
