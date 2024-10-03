import { FilterChipItem } from "@myCash/common";
import { RootState, clearInvoicesType, setInvoicesType } from "../../lib";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/material";
import { StyledStack } from "@myCash/common/categorySection/styles";
import { useTranslation } from "react-i18next";

interface InvoicesMainSliderProps {}

export const InvoicesMainSlider: React.FC<InvoicesMainSliderProps> = () => {
  const invoicesState = useSelector((state: RootState) => state.invoices);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <StyledStack direction="column" spacing={2} alignItems="center">
      {/* <MainIcon
        icon={<ArrangeVertical />}
        bgColor={
          invoicesState?.filters.sort === SORTING.ASC ? "secondary" : "white"
        }
        iconcolor={
          invoicesState?.filters.sort === SORTING.ASC ? "white" : "black"
        }
        size="small"
        outlined={invoicesState?.filters.sort !== SORTING.ASC}
        onClick={() => {
          dispatch(
            setInvoicesSort(
              invoicesState.filters.sort === SORTING.ASC
                ? SORTING.DESC
                : SORTING.ASC
            )
          );
        }}
      /> */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ padding: "0 1rem", width: "100%" }}
      >
        <FilterChipItem
          name={t("all")}
          id={0}
          handleClick={() => {
            dispatch(clearInvoicesType());
          }}
          selected={
            !invoicesState.filters.invoiceType &&
            !invoicesState.filters.isReturn &&
            !invoicesState.filters.type
              ? true
              : false
          }
        />
        <FilterChipItem
          name={t("invoice.filters.taxInvoices")}
          id={1}
          fullWidth
          handleClick={() => {
            dispatch(setInvoicesType({ invoiceType: 2 }));
          }}
          selected={invoicesState.filters.invoiceType === 2 ? true : false}
        />
        <FilterChipItem
          name={t("invoice.filters.simpleInvoices")}
          id={2}
          fullWidth
          handleClick={() => {
            dispatch(setInvoicesType({ invoiceType: 1 }));
          }}
          selected={invoicesState.filters.invoiceType === 1 ? true : false}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ padding: "0 1rem", width: "100%" }}
      >
        {/* hidden 	Buy Invoices	button for now but will used  */}
        {/* <FilterChipItem
          name={t("invoice.filters.buyInvoices")}
          id={2}
          fullWidth
          handleClick={() => {
            dispatch(setInvoicesType({ invoiceType: 3 }));
          }}
          selected={invoicesState.filters.invoiceType === 3 ? true : false}
        /> */}
        <FilterChipItem
          name={t("invoice.filters.quickInvoice")}
          id={2}
          fullWidth
          handleClick={() => {
            dispatch(setInvoicesType({ type: 2 }));
          }}
          selected={invoicesState.filters.type === 2 ? true : false}
        />
        <FilterChipItem
          name={t("invoice.filters.returnSellInvoices")}
          id={2}
          fullWidth
          handleClick={() => {
            dispatch(setInvoicesType({ isReturn: 1, invoiceType: 1 }));
          }}
          selected={
            invoicesState.filters.isReturn === 1 &&
            invoicesState.filters.invoiceType &&
            invoicesState.filters.invoiceType !== 3
              ? true
              : false
          }
        />
         {/* hidden 	return Buy Invoices	button for now but will used  */}
        {/* <FilterChipItem
          name={t("invoice.filters.returnBuyInvoices")}
          id={2}
          fullWidth
          handleClick={() => {
            dispatch(setInvoicesType({ isReturn: 1, invoiceType: 3 }));
          }}
          selected={
            invoicesState.filters.isReturn === 1 &&
            invoicesState.filters.invoiceType === 3
              ? true
              : false
          }
        /> */}
      </Stack>
    </StyledStack>
  );
};
