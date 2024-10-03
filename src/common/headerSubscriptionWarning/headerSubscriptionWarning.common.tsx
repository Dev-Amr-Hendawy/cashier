import { Avatar, Button, Stack, Typography } from "@mui/material";
import { StyledContainer, StyledHeader } from "./styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setSubscriptionWarning } from "@myCash/lib";

import { useMemo } from "react";
import dangerCircleIcon from "../../assets/icons/dangerCircle.svg";
import crowIcon from "../../assets/icons/crown.svg";

export const HeaderSubscriptionWarning = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToSupscription = () => {
    navigate("/supscription-payment");
  };
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user?.user);
  const SubscriptionWarningStatus = useSelector(
    (state: RootState) => state.subscriptionWarning
  );

  useMemo(() => {
    if (user && user?.subscription?.endDate) {
      dispatch(
        setSubscriptionWarning({
          id: user.subscription.package.id,
          end: user.subscription.endDate,
          expire: user.subscription.expire,
        })
      );
    }
  }, [user?.id, user?.subscription?.endDate, dispatch]);
  if(!SubscriptionWarningStatus.haveHeader) return;

  return (
    <StyledHeader
      position="relative"
      sx={{
        backgroundColor: SubscriptionWarningStatus.isExpiring
          ? "var(--error-error300)"
          : SubscriptionWarningStatus.isExpiringSoon &&
            SubscriptionWarningStatus.isFree
          ? "var(--success-success300)"
          : SubscriptionWarningStatus.isExpiringSoon &&
            !SubscriptionWarningStatus.isFree
          ? "var(--warning-warning300)"
          : "#fff",
      }}
    >
      <StyledContainer maxWidth={false}>
        <Stack direction="row" width="100%">
          <Stack
            flex={1}
            display={"flex"}
            direction={"row"}
            alignItems={"center"}
            gap={1}
          >
            <Avatar src={dangerCircleIcon} alt="danger Circle Icon" />{" "}
            <Typography
              variant="h6"
              sx={{
                color:
                  SubscriptionWarningStatus.isExpiringSoon &&
                  !SubscriptionWarningStatus.isFree
                    ? "var(--text-color)"
                    : "#fff",
              }}
            >
              {SubscriptionWarningStatus.isExpiring
                ? t("messageSubscriptionWarningisExpiring")
                : SubscriptionWarningStatus.isExpiringSoon &&
                  SubscriptionWarningStatus.isFree
                ? t("messageSubscriptionWarningIsFree")
                : SubscriptionWarningStatus.isExpiringSoon &&
                  !SubscriptionWarningStatus.isFree
                ? t("messageSubscriptionWarningIsNotFree", {
                    endDate: user?.subscription?.endDate,
                  })
                : ""}
            </Typography>
          </Stack>

          <Button
            onClick={navigateToSupscription}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "999px",
              backgroundColor:
                SubscriptionWarningStatus.isExpiringSoon &&
                !SubscriptionWarningStatus.isFree
                  ? ""
                  : "white",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} display={"flex"}>
              <Typography
                variant="h6"
                sx={{
                  color:
                    SubscriptionWarningStatus.isExpiringSoon &&
                    !SubscriptionWarningStatus.isFree
                      ? "#fff"
                      : "var(--text-color)",
                }}
              >
                {SubscriptionWarningStatus.isExpiring
                  ? t("reNewSupscription")
                  : SubscriptionWarningStatus.isExpiringSoon &&
                    SubscriptionWarningStatus.isFree
                  ? t("supscriptionNow")
                  : SubscriptionWarningStatus.isExpiringSoon &&
                    !SubscriptionWarningStatus.isFree
                  ? t("reNewSupscription")
                  : ""}
              </Typography>
              {SubscriptionWarningStatus.isExpiringSoon &&
              !SubscriptionWarningStatus.isFree ? (
                ""
              ) : (
                <Avatar src={crowIcon} alt="crow Icon " />
              )}
            </Stack>
          </Button>
        </Stack>
      </StyledContainer>
    </StyledHeader>
  );
};
