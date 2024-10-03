import * as React from "react";

import { BackDrop, DrawerLinksContainer, UserInfoCard } from "@myCash/common";

import CssBaseline from "@mui/material/CssBaseline";
import { Global } from "@emotion/react";
import { Logout } from "@myCash/components";
import { Stack } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useGetInfo } from "@myCash/hooks";
import profileLogo from "../../assets/images/profile-logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { ReportsDrawer } from "./reportsDrawer";
import {
  firstLinks,
  fourthLinks,
  reportsSubLinks,
  secondLinks,
  thirdLinks,
} from "@myCash/constants";

// TODO::refac
const Root = styled("div")(({ theme }) => ({
  // height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

type DrawerProps = {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
};

export const Drawer: React.FC<DrawerProps> = ({ openDrawer, toggleDrawer }) => {
  const { t } = useTranslation();
  const { data, isPending: getShiftPending } = useGetInfo();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(100vh - 5.5rem)`,
            overflow: "visible",
            backgroundColor: "var(--background-color)",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        // swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <BackDrop open={getShiftPending} />
        <StyledBox
          sx={{
            position: "absolute",
            top: 0,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "flex-start",
            width: "50%",
            margin: "0 auto",
            padding: "1.5rem",
          }}
        >
          <UserInfoCard
            userName={data?.data?.name || ""}
            userRole={
              user?.type == 2 ? t("users.form.cashier") : t("users.form.admin")
            }
            logo={data?.data?.accountInfo?.logo || profileLogo}
          />
          <Logout />
          <Stack gap={"12px"}>
            <DrawerLinksContainer
              items={firstLinks}
              handleLinkClick={toggleDrawer(false)}
            >
              <ReportsDrawer
                reportsSubLinks={reportsSubLinks}
                handleLinkClick={toggleDrawer(false)}
              />
            </DrawerLinksContainer>
            <DrawerLinksContainer
              items={secondLinks}
              handleLinkClick={toggleDrawer(false)}
            />
            <DrawerLinksContainer
              items={thirdLinks}
              handleLinkClick={toggleDrawer(false)}
            />
            <DrawerLinksContainer
              items={fourthLinks}
              handleLinkClick={toggleDrawer(false)}
            />
          </Stack>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};
