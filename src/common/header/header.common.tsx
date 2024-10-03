import { Box, Stack } from "@mui/material";
import headerLogo from "../../assets/images/auth-logo.svg";
import { StyledContainer, StyledHeader, StyledLogo } from "./styles";
import { useNavigate } from "react-router-dom";
import Button from "@myCash/components/form/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { AccountMenu } from "../accountMenu";
// import { HeaderActions } from "../headerActions";
import { ROUTES } from "@myCash/constants";
import { HeaderSubscriptionWarning } from "../headerSubscriptionWarning";

export const Header = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user?.user);
  return (<>
    <StyledHeader position="relative">
      <StyledContainer maxWidth={false}>
        <Stack direction="row"  width="100%">
        <Stack flex={1}  display={"flex"} > <Box  display={"flex"} flexDirection={"row"} width={"auto"} my={"auto"}> <AccountMenu /></Box></Stack>

          <StyledLogo
            src={headerLogo}
            alt="header-logo"
            onClick={navigateToHome}
          />
          {user?.accountInfo?.quickInvoice ? (
            <Stack flex={1} display={"flex"} justifyContent={"end"}><Box   justifyContent={"end"} display={"flex"} width={"auto"} > <Button
              variant="contained"
              color="primary"
              text={t("header.immediateInvoice")}
              width="auto"
              fontWeight="400"
              onClick={() => {
                navigate(ROUTES.QUICK_INVOICE);
              }}
            /></Box></Stack>
          ) : null}
        </Stack>
      </StyledContainer>
    </StyledHeader>
    <HeaderSubscriptionWarning/>
    </>
  );
};
