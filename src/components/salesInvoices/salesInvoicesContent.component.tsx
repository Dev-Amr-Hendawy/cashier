import { Box, Stack, Typography } from "@mui/material";
import {
  CartLogo,
  StyledRightSideContainer,
} from "@myCash/common/cartContainer/styles";
import { HomeLayout, Table } from "@myCash/common";
import {
  SalesInvoicesHeader,
  SalesInvoicesSettings,
  SalesInvoicesSlider,
} from "@myCash/components";

import { StyledPadding } from "./styles";
import cartLogo from "../../assets/images/cart-logo.svg";
import cartLogoDark from "../../assets/images/auth-logo-dark.svg";
import { salesInvoicesColumns } from "./columnsStructure/salesInvoicesColumns";
import { useTranslation } from "react-i18next";
import { useColorMode } from "@myCash/hooks";

interface SalesInvoicesContentProps {}

export const SalesInvoicesContent: React.FC<SalesInvoicesContentProps> = () => {
  const { t } = useTranslation();
  const columns = salesInvoicesColumns(t);
  const showDetails = true;
  const { isLightMode } = useColorMode();
  return (
    <HomeLayout
      leftSide={
        <Stack
          sx={{
            height: "calc(100vh - 5.5rem)",
          }}
        >
          <StyledPadding>
            <Typography variant="h4">{t("invoice.title")}</Typography>
          </StyledPadding>
          <SalesInvoicesHeader />
          <SalesInvoicesSlider />
          <Table columns={columns} rows={[]} />
        </Stack>
      }
      rightSide={
        <Stack>
          <SalesInvoicesSettings />

          <StyledRightSideContainer>
            {showDetails ? (
              <Stack>
                <Box
                  sx={{
                    padding: "0 2rem",
                  }}
                >
                  {/* <InvoiceDetailsWithActions />
                  <Invoice borderless /> */}
                </Box>
              </Stack>
            ) : (
              <CartLogo
                src={isLightMode ? cartLogo : cartLogoDark}
                alt="cart-logo"
              />
            )}
          </StyledRightSideContainer>
        </Stack>
      }
    />
  );
};
