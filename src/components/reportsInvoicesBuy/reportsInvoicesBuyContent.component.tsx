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
  useGetReportsInvoicesBuy,
} from "@myCash/hooks";
import cartLogo from "@myCash/assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import Fading from "../ui/animation/Fading";
import { reportsInvoicesBuyColumns } from "./columnStructure/reportsInvoicesBuyColumns";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import {
  ReportsBuyHeader,
  ReportsBuyDetails,
  ReportsBuySettings,
} from "@myCash/components";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { useState } from "react";

interface ReportsInvoicesBuyContentProps {}

export const ReportsInvoicesBuyContent: React.FC<
  ReportsInvoicesBuyContentProps
> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLightMode } = useColorMode();
  const invoicesColumns = reportsInvoicesBuyColumns(t);
  const {
    filters,
    setDateFilters,
    handleResetDateFilters: resetParentFilters,
  } = useDatePickerHandler();
  const [buyFilters, setBuyFilters] = useState({ invoiceType: "" });
  const { hasNextPage, ref, data, isFetchingNextPage, isPending } =
    useGetReportsInvoicesBuy({
      ...filters,
      invoiceType: buyFilters.invoiceType,
    });
  const reports = data?.pages.flat();
  const reportsBuyState = useSelector(
    (state: RootState) => state.reportsInvoices.buyReport
  );
  return (
    <Stack className="page-container">
      <HeaderWithBack
        title={t("reports.buyInvoices")}
        handleClose={() => navigate(-1)}
      />
      <HomeLayout
        leftSide={
          <ScrollContainer>
            <Stack>
              <ReportsBuyHeader
                setDateFilters={setDateFilters}
                resetParentFilters={resetParentFilters}
                setBuyFilters={(value: string) =>
                  setBuyFilters({ invoiceType: value })
                }
              />
              {isPending ? (
                <Stack margin={"10% 40%"}>
                  <CircularProgress size={70} />
                </Stack>
              ) : (
                <Stack>
                  <Table columns={invoicesColumns} rows={reports || []} />
                  {hasNextPage && <CircularProgress size={24} ref={ref} />}
                </Stack>
              )}
            </Stack>
          </ScrollContainer>
        }
        rightSide={
          <Stack>
            <ReportsBuySettings />
            <StyledRightSideContainer>
              {!reports?.length &&
              !isFetchingNextPage &&
              !reportsBuyState.invoicesCount ? (
                <Stack height={"100vh"}>
                  <CartLogo
                    src={isLightMode ? cartLogo : cartLogoDark}
                    alt="cart-logo"
                  />
                </Stack>
              ) : (
                <Fading>
                  <ReportsBuyDetails
                    data={reportsBuyState}
                    invoicesBuyCount={reportsBuyState.invoicesCount}
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
