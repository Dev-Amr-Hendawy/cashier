import { Button, Menu, MenuItem, styled } from "@mui/material";
import { ArrowDown2 } from "iconsax-react";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  position?: "absolute" | "relative";
};

const NewLanguageButton = ({ position = "relative" }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { i18n } = useTranslation();
  const handleChangeLanguage = (val:string) => {
 
      i18n.changeLanguage(val);
    
    handleClose()
  };
  return (<>
    <StyledButton
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      sx={{
        position: position,
        top: position === "absolute" ? "4rem" : "unset",
        left: {
          xs: position === "absolute" ? "2rem" : "unset",
          xl: position === "absolute" ? "4rem" : "unset",
        },
      }}
    >
      {i18n.language === "ar" ? "العربية" : "English"}
      <ArrowDown2  size="28"/>
    </StyledButton>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      
      >
        <MenuItem onClick={()=>{handleChangeLanguage("ar")}}>عربيه</MenuItem>
        <MenuItem onClick={()=>{handleChangeLanguage("en")}}>English</MenuItem>
     
      </Menu>
    </>
  );
};

export default NewLanguageButton;

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
  // backgroundColor: 'rgba(35, 39, 115, 0.15)',
  // "&:hover": {
  //   backgroundColor: theme.palette.grey[200],
  // },
}));
