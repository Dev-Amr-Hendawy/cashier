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
  useGetReportsInvoicesReturned
} from "@myCash/hooks";
import cartLogo from "@myCash/assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import Fading from "../ui/animation/Fading";
import { reportsInvoicesReturnedColumns } from "./columnStructure/reportsInvoicesReturnedColumns";
import { useDispatch} from "react-redux";
import { setInvoiceId } from "@myCash/lib";

import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { useState } from "react";
import { InvoiceType } from "@myCash/types";
import { ReportsReturnedHeader } from "./reportsReturnedHeader.component";
import { ReportsReturnedDetails } from "./reportsReturnedDetails.component";

interface ReportsInvoicesReturnedContentProps {}

export const ReportsInvoicesReturnedContent: React.FC<
  ReportsInvoicesReturnedContentProps
> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLightMode } = useColorMode();
  const invoicesColumns = reportsInvoicesReturnedColumns(t);
  const {
    filters,
    setDateFilters,
    handleResetDateFilters: resetParentFilters,
  } = useDatePickerHandler();
  const [returnedFilters, setReturnedFilters] = useState({ invoiceType: "" ,branch_id:""});
  const { hasNextPage, ref, data, isRefetching, isPending } =
  useGetReportsInvoicesReturned({
      ...filters,
      invoiceType: returnedFilters.invoiceType,
      branch_id: returnedFilters.branch_id
    });
    const reports = data?.pages?.flatMap((page) => page.reportsInvoices) || [];
    const reportsReturned = data?.pages?.[0]?.report|| {
      invoicesCount:0||null,
total_returned_amount:0||null
    };
  
 
  
  const handleRowClick = (data: InvoiceType) => {
    dispatch(setInvoiceId(data.id));
    window.open(`/invoices/${data.id}`)
  };

  return (
    <Stack className="page-container">
      <HeaderWithBack
        title={t("reports.returnedInvoices")}
        handleClose={() => navigate(-1)}
      />
      <HomeLayout
        leftSide={
          <ScrollContainer>
            <Stack>
              <ReportsReturnedHeader
                setDateFilters={setDateFilters}
                resetParentFilters={resetParentFilters}
                setReturnedFilters={(key,value) =>
                  setReturnedFilters((prevState) => ({
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
            {/* <ReportsReturnedSettings /> */}
            <StyledRightSideContainer>
              {!reports?.length &&
              !isRefetching &&
              !reportsReturned?.invoicesCount ? (
                <Stack height={"100vh"}>
                  <CartLogo
                    src={isLightMode ? cartLogo : cartLogoDark}
                    alt="cart-logo"
                  />
                </Stack>
              ) : (
                <Fading>
                   <ReportsReturnedDetails
                     totalReturnedAmount={reportsReturned?.total_returned_amount}
                     invoicesReturnedCount={reportsReturned?.invoicesCount}
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
