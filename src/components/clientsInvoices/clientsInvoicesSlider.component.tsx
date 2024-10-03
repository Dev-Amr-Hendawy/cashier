import { FilterChipItem } from "@myCash/common";
import {
  clearInvoicesType,
  RootState,
  setInvoicesPaymentStatus,
  setInvoicesType,
} from "../../lib";
import { useDispatch, useSelector } from "react-redux";

// import { Stack } from "@mui/material";
import { StyledStack } from "@myCash/common/categorySection/styles";
import { useTranslation } from "react-i18next";
// import { InvoicesMainSlider } from "./invoicesMainSlider.component";
import { SliderContainer } from "./styles";
import Slider from "react-slick";

interface ClientsInvoicesSliderProps { }

export const ClientsInvoicesSlider: React.FC<
  ClientsInvoicesSliderProps
> = () => {
  const invoicesState = useSelector((state: RootState) => state.invoices);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const settings = {
    className: " ",
    infinite: false,
    speed: 500,
    arrows: true,
    dots: false,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <StyledStack direction="row" spacing={2} alignItems="center">
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

        <SliderContainer
          sx={{
            "& .slick-slide": {
              display: "flex",
              justifyContent: "center",
              padding: "0 6px", // Half of 12px to get 12px gap between slides
              boxSizing: "border-box",
            },
            "& .filter-chip-item": {
              flexGrow: 1,
              flexBasis: "auto",
            }
          }}
          dir="rtl"
        >
          <Slider
            {...settings}
          // pauseOnFocus
          //  pauseOnHover
          >
            <FilterChipItem
              name={t("invoice.filters.taxInvoices")}
              id={1}
              fullWidth
              handleClick={() => {
                invoicesState.filters.invoiceType === 2 ? dispatch(clearInvoicesType()) : dispatch(setInvoicesType({ invoiceType: 2 }));
              }}
              selected={invoicesState.filters.invoiceType === 2 ? true : false}
            />
            <FilterChipItem
              name={t("invoice.filters.simpleInvoices")}
              id={2}
              fullWidth
              handleClick={() => {
                invoicesState.filters.invoiceType === 1
                  ? dispatch(clearInvoicesType())
                  : dispatch(setInvoicesType({ invoiceType: 1 }));
              }}
              selected={invoicesState.filters.invoiceType === 1 ? true : false}
            />
            <FilterChipItem
              name={t("invoice.filters.quickInvoice")}
              id={2}
              fullWidth
              handleClick={() => {
                invoicesState.filters.type === 2
                  ? dispatch(clearInvoicesType())
                  : dispatch(setInvoicesType({ type: 2 }));
              }}
              selected={invoicesState.filters.type === 2 ? true : false}
            />
            <FilterChipItem
              name={t("invoice.filters.returnSellInvoices")}
              id={3}
              fullWidth
              handleClick={() => {
                invoicesState.filters.isReturn === 1
                  ? dispatch(clearInvoicesType())
                  : dispatch(setInvoicesType({ isReturn: 1 }));
              }}
              selected={
                invoicesState.filters.isReturn === 1 ? true
                  : false
              }
            />
          </Slider>
        </SliderContainer>
      </StyledStack>
      <StyledStack direction="row" spacing={2} alignItems="center">
        <FilterChipItem
          name={t("all")}
          id={0}
          handleClick={() => {
            dispatch(setInvoicesPaymentStatus(""));
          }}
          selected={invoicesState.filters.paymentStatus === "" ? true : false}
        />
        <FilterChipItem
          name={t("client.completedInvoices")}
          id={1}

          handleClick={() => {
            invoicesState.filters.paymentStatus === "1"
              ? dispatch(setInvoicesPaymentStatus(""))
              : dispatch(setInvoicesPaymentStatus("1"));
          }}
          selected={invoicesState.filters.paymentStatus === "1" ? true : false}
        />
        <FilterChipItem
          name={t("client.delayedInvoices")}
          id={2}

          handleClick={() => {
            invoicesState.filters.paymentStatus === "2"
              ? dispatch(setInvoicesPaymentStatus(""))
              : dispatch(setInvoicesPaymentStatus("2"));
          }}
          selected={invoicesState.filters.paymentStatus === "2" ? true : false}
        />
      </StyledStack>
    </>
  );
};
