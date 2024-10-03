import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import {
  useColorMode,
  useDatePickerHandler,
  useGetReportsInvoicesSell,
} from "@myCash/hooks";
import { useTranslation } from "react-i18next";
import cartLogo from "@myCash/assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import Fading from "../ui/animation/Fading";
import { reportsInvoicesSellColumns } from "./columnStructure/reportsInvoicesSellColumns";
import { setInvoiceId } from "@myCash/lib";
import { ReportsSellHeader, ReportsSellDetails } from "@myCash/components";
import { InvoiceType } from "@myCash/types";
import "./styles.scss";

interface ReportsInvoicesSellSpecialTimeContentProps {}

export const ReportsInvoicesSellSpecialTimeContent: React.FC<
  ReportsInvoicesSellSpecialTimeContentProps
> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dateFrom, dateTo, branchId } = useParams();
  const { isLightMode } = useColorMode();
  const invoicesColumns = reportsInvoicesSellColumns(t);

  const {
    filters,
    setDateFilters,
    handleDateFrom,
    handleDateTo,
    handleResetDateFilters,
  } = useDatePickerHandler();

  const [sellFilters, setSellFilters] = useState({
    invoiceType: "",
    branch_id: "",
  });

  // Destructure the new structure from the useGetReportsInvoicesSell hook
  const { hasNextPage, ref, data, isRefetching, isPending } =
    useGetReportsInvoicesSell({
      ...filters,
      invoiceType: sellFilters.invoiceType,
      branch_id: sellFilters.branch_id,
    });

  // Flatten the pages and extract reportsInvoices
  const reports = data?.pages?.flatMap((page) => page.reportsInvoices) || [];
  const reportsSell = data?.pages?.[0].report|| [];


  const dispatch = useDispatch();

  useEffect(() => {
    if (dateFrom || dateTo) {
      const formatDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("-");
        return `${year}-${month}-${day}`;
      };

      const formattedDateFrom = dateFrom ? formatDate(dateFrom) : "";
      const formattedDateTo = dateTo ? formatDate(dateTo) : "";

      if (formattedDateFrom && !isNaN(Date.parse(formattedDateFrom))) {
        handleDateFrom(new Date(formattedDateFrom));
      }

      if (formattedDateTo && !isNaN(Date.parse(formattedDateTo))) {
        handleDateTo(new Date(formattedDateTo));
      }
      setDateFilters({
        date_from: dateFrom || "",
        date_to: dateTo || "",
      });
    }

    if (branchId) {
      setSellFilters((prev) => ({
        ...prev,
        branch_id: branchId,
      }));
    }
  }, [dateFrom, dateTo, branchId]);

  const handleRowClick = (data: InvoiceType) => {
    dispatch(setInvoiceId(data.id));
    window.open(`/invoices/${data.id}`)
  };

  return (
    <Stack className="page-container">
      <HeaderWithBack
        title={t("reports.sellInvoices")}
        handleClose={() => navigate(-1)}
      />
      <HomeLayout
        leftSide={
          <ScrollContainer>
            <Stack>
              <ReportsSellHeader
                setDateFilters={setDateFilters}
                sellFilters={sellFilters}
                resetParentFilters={handleResetDateFilters}
                setSellFilters={(key, value) =>
                  setSellFilters((prev) => ({ ...prev, [key]: value }))
                }
              />
              {isPending ? (
                <Stack margin={"10% 40%"}>
                  <CircularProgress size={70} />
                </Stack>
              ) : (
                <Stack>
                  <Table
                    columns={invoicesColumns}
                    rows={reports}
                    rowClickHandler={handleRowClick}
                  />
                  {hasNextPage && <CircularProgress size={24} ref={ref} />}
                </Stack>
              )}
            </Stack>
          </ScrollContainer>
        }
        rightSide={
          <Stack>
            <StyledRightSideContainer>
              {!reports.length &&
              !isRefetching &&
              !reportsSell.invoicesCount &&
              reportsSell.invoicesCount < 0 ? (
                <Stack height={"100vh"}>
                  <CartLogo
                    src={isLightMode ? cartLogo : cartLogoDark}
                    alt="cart-logo"
                  />
                </Stack>
              ) : (
                <Fading>
                  <ReportsSellDetails
                    data={reportsSell}
                    invoicesSellCount={reportsSell.invoicesCount}
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
