import { Stack, Typography } from "@mui/material";
import { CircularLoader, HomeLayout, ScrollContainer } from "@myCash/common";
import {
  BranchSettings,
  BranchesHeader,
  BranchesView,
  SingleBranchDetails,
} from "@myCash/components";
import { useTranslation } from "react-i18next";
import { StyledPadding } from "../salesInvoices/styles";
import {
  CartLogo,
  StyledRightSideContainer,
} from "@myCash/common/cartContainer/styles";
import Fading from "../ui/animation/Fading";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import cartLogo from "@myCash/assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import { useColorMode, useCustomFilter, useGetBranches } from "@myCash/hooks";

interface BranchContentProps {}

export const BranchContent: React.FC<BranchContentProps> = () => {
  const { t } = useTranslation();
  const branch = useSelector((state: RootState) => state.branch);
  const { isLightMode } = useColorMode();
  const branchesFilters = useCustomFilter({
    date_from: "",
    date_to: "",
    status: "",
    city: "",
  });
  const getBranchesQuery = useGetBranches(branchesFilters.filters);
  const branches = getBranchesQuery.data?.pages?.flat();
  return (
    <HomeLayout
      leftSide={
        <Stack>
          <ScrollContainer>
            <StyledPadding>
              <Typography variant="h4">{t("branches.title")}</Typography>
            </StyledPadding>
            <BranchesHeader branchesFilters={branchesFilters} />
            {getBranchesQuery.isPending &&
            !getBranchesQuery.isFetchingNextPage ? (
              <CircularLoader size={30} isPageView />
            ) : (
              <BranchesView
                branches={branches ?? []}
                getBranchesQuery={getBranchesQuery}
              />
            )}
          </ScrollContainer>
        </Stack>
      }
      rightSide={
        <Stack>
          <ScrollContainer>
            <BranchSettings />
            <StyledRightSideContainer>
              {!branch?.id ? (
                <CartLogo
                  src={isLightMode ? cartLogo : cartLogoDark}
                  alt="cart-logo"
                />
              ) : (
                <Fading>
                  <SingleBranchDetails />
                </Fading>
              )}
            </StyledRightSideContainer>
          </ScrollContainer>
        </Stack>
      }
    />
  );
};
