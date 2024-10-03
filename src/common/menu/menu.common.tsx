import { Menu as MuiMenu } from "@mui/material";

type MenuProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  id: string;
};

export const Menu: React.FC<MenuProps> = ({
  anchorEl,
  open,
  handleClose,
  children,
  id,
}) => {
  return (
    <MuiMenu
      anchorEl={anchorEl}
      id={id}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            borderRadius: "1rem",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {children}
    </MuiMenu>
  );
};
