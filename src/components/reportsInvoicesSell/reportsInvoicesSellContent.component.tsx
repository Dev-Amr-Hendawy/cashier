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
  useGetReportsInvoicesSell,
} from "@myCash/hooks";
import cartLogo from "@myCash/assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import Fading from "../ui/animation/Fading";
import { reportsInvoicesSellColumns } from "./columnStructure/reportsInvoicesSellColumns";
import { useDispatch} from "react-redux";
import { setInvoiceId } from "@myCash/lib";
import {
  ReportsSellHeader,
  ReportsSellDetails,
  // ReportsSellSettings,
} from "@myCash/components";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { useState } from "react";
import { InvoiceType } from "@myCash/types";

interface ReportsInvoicesSellContentProps {}

export const ReportsInvoicesSellContent: React.FC<
  ReportsInvoicesSellContentProps
> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLightMode } = useColorMode();
  const invoicesColumns = reportsInvoicesSellColumns(t);
  const {
    filters,
    setDateFilters,
    handleResetDateFilters: resetParentFilters,
  } = useDatePickerHandler();
  const [sellFilters, setSellFilters] = useState({ invoiceType: "" ,branch_id:""});
  const { hasNextPage, ref, data, isRefetching, isPending } =
    useGetReportsInvoicesSell({
      ...filters,
      invoiceType: sellFilters.invoiceType,
      branch_id: sellFilters.branch_id
    });
    const reports = data?.pages?.flatMap((page) => page.reportsInvoices) || [];
    const reportsSell = data?.pages?.[0].report|| [];
  
  
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
                resetParentFilters={resetParentFilters}
                setSellFilters={(key,value) =>
                  setSellFilters((prevState) => ({
                    ...prevState,
                    [key]: value, 
                  }))               
                 }
              />
              {isPending ? (
                <Stack margin={"10% 40%"}>
                  <CircularProgress size={70} />
                </Stack>
              ) : (
                <Stack>
                  <Table columns={invoicesColumns} rows={reports || []} rowClickHandler={handleRowClick}/>
                  {hasNextPage && <CircularProgress size={24} ref={ref} />}
                </Stack>
              )}
            </Stack>
          </ScrollContainer>
        }
        rightSide={
          <Stack>
            {/* <ReportsSellSettings /> */}
            <StyledRightSideContainer>
              {!reports?.length &&
              !isRefetching &&
              !reportsSell.invoicesCount ? (
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
