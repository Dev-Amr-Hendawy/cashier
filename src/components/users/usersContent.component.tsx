import { Stack, Typography } from "@mui/material";
import { CircularLoader, HomeLayout, ScrollContainer } from "@myCash/common";
import { StyledPadding } from "../salesInvoices/styles";
import { useTranslation } from "react-i18next";
import {
  RecordDetailsModal,
  SingleUserDetails,
  // SingleUserRecords,
  // SingleUserSales,
  UserSettings,
  UsersHeader,
  UsersView,
} from "@myCash/components";
import { useState } from "react";
import Fading from "../ui/animation/Fading";
import {
  CartLogo,
  StyledRightSideContainer,
} from "@myCash/common/cartContainer/styles";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import cartLogo from "@myCash/assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import { useColorMode, useCustomFilter, useGetEmployees } from "@myCash/hooks";

interface UsersContentProps {}

export const UsersContent: React.FC<UsersContentProps> = () => {
  const { t } = useTranslation();
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const employee = useSelector((state: RootState) => state.employee);
  const { isLightMode } = useColorMode();
  const usersFilters = useCustomFilter({
    branch_id: "",
    date_from: "",
    date_to: "",
  });
  const getUsersQuery = useGetEmployees(usersFilters.filters);
  const employees = getUsersQuery.data?.pages?.flat();
  return (
    <HomeLayout
      leftSide={
        <ScrollContainer>
          <Stack>
            <StyledPadding>
              <Typography variant="h4">{t("users.title")}</Typography>
            </StyledPadding>
            <UsersHeader usersFilters={usersFilters} />
            {getUsersQuery.isPending && !getUsersQuery.isFetchingNextPage ? (
              <CircularLoader size={30} isPageView />
            ) : (
              <UsersView
                employees={employees ?? []}
                getUsersQuery={getUsersQuery}
              />
            )}
          </Stack>
        </ScrollContainer>
      }
      rightSide={
        <Stack>
          <ScrollContainer>
            <UserSettings />
            <StyledRightSideContainer>
              {!employee?.id ? (
                <CartLogo
                  src={isLightMode ? cartLogo : cartLogoDark}
                  alt="cart-logo"
                />
              ) : (
                <Fading>
                  <SingleUserDetails />
                  {/* <SingleUserSales /> */}
                  {/* <SingleUserRecords
                    handleRecordModal={(value) => setRecordModalOpen(value)}
                  /> */}
                  <RecordDetailsModal
                    open={recordModalOpen}
                    handleClose={() => setRecordModalOpen(false)}
                    totalSales="400"
                  />
                </Fading>
              )}
            </StyledRightSideContainer>
          </ScrollContainer>
        </Stack>
      }
    />
  );
};
