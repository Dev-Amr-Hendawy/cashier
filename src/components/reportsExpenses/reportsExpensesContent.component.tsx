import { CircularProgress, Stack } from "@mui/material";
import {
  HeaderWithBack,
  HomeLayout,
  ScrollContainer,
  Table,
} from "@myCash/common";
import {
  CartLogo,
  StyledRightSideContainer,
} from "@myCash/common/cartContainer/styles";
import { useTranslation } from "react-i18next";
import {
  useColorMode,
  useDatePickerHandler,
  useGetReportsExpenses,
} from "@myCash/hooks";
import cartLogo from "@myCash/assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import Fading from "../ui/animation/Fading";
import { reportsExpensesColumns } from "./columnStructure/reportsExpensesColumns";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import {
  ReportsExpensesHeader,
  ReportsExpensesDetails,
  ReportsExpensesSettings,
} from "@myCash/components";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

interface ReportsExpensesContentProps {}

export const ReportsExpensesContent: React.FC<
  ReportsExpensesContentProps
> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLightMode } = useColorMode();
  const expensesColumns = reportsExpensesColumns(t);
  const {
    filters,
    setDateFilters,
    handleResetDateFilters: resetParentFilters,
  } = useDatePickerHandler();
  const { hasNextPage, ref, data, isRefetching, isPending } =
    useGetReportsExpenses(filters);
  const reports = data?.pages.flat();
  const reportsExpensesState = useSelector(
    (state: RootState) => state.reportsExpenses
  );
  return (
    <Stack className="page-container">
      <HeaderWithBack
        title={t("expenses.title")}
        handleClose={() => navigate(-1)}
      />
      <HomeLayout
        leftSide={
          <ScrollContainer>
            <Stack>
              <ReportsExpensesHeader
                setDateFilters={setDateFilters}
                resetParentFilters={resetParentFilters}
              />
              <Stack>
                <Table columns={expensesColumns} rows={reports || []} />
                {hasNextPage && <CircularProgress size={24} ref={ref} />}
              </Stack>
            </Stack>
          </ScrollContainer>
        }
        rightSide={
          <Stack>
            <ReportsExpensesSettings />
            <StyledRightSideContainer>
              {!reports?.length && !isPending && !isRefetching ? (
                <Stack height={"100vh"}>
                  <CartLogo
                    src={isLightMode ? cartLogo : cartLogoDark}
                    alt="cart-logo"
                  />
                </Stack>
              ) : (
                <Fading>
                  <ReportsExpensesDetails
                    data={reportsExpensesState.report}
                    expensesCount={reports?.length}
                  />
                </Fading>
              )}
            </StyledRightSideContainer>
          </Stack>
        }
      />
    </Stack>
  );
};
