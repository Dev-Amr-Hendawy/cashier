import { Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  position?: "absolute" | "relative";
};

const LanguageButton = ({ position = "absolute" }: Props) => {
  const { i18n } = useTranslation();
  const handleChangeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("ar");
    } else {
      i18n.changeLanguage("en");
    }
  };
  return (
    <StyledButton
      onClick={handleChangeLanguage}
      sx={{
        position: position,
        top: position === "absolute" ? "4rem" : "unset",
        left: {
          xs: position === "absolute" ? "2rem" : "unset",
          xl: position === "absolute" ? "4rem" : "unset",
        },
      }}
    >
      {i18n.language === "en" ? "العربية" : "English"}
    </StyledButton>
  );
};

export default LanguageButton;

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "1.25rem",
  borderRadius: "1rem",
  padding: ".5rem 2rem",
  border: "2px solid",
  borderColor: theme.palette.primary.main,

  color: theme.palette.primary.main,
  backgroundColor: "transparent",
  "&:hover": {
    opacity: "0.9"
  },
}));
