import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import profileLogo from "../../assets/images/profile-logo.svg";
import { Menu } from "../menu";
import { StyledBadge, StyledIconButton } from "./styles";
import { Drawer } from "..";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { Stack } from "@mui/material";

export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const { mutate } = useLogout();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };
  const handleClick = () => {
    // setAnchorEl(event.currentTarget);
    setOpenDrawer(true);
  };
  const user = useSelector((state: RootState) => state.user);
  return (
    <Stack width={"auto"} height={"auto"} >
      
        <StyledBadge>
          <StyledIconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={user.user?.accountInfo?.logo || profileLogo}
              alt="my-cash"
            />
          </StyledIconButton>
        </StyledBadge>
        <Drawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          handleClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              // mutate();
              handleClose();
            }}
          >
            <Avatar /> logout
          </MenuItem>
        </Menu>
      
    </Stack>
  );
};
