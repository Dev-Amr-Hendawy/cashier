import { Stack, Typography } from "@mui/material";
import { HomeLayout, ScrollContainer } from "@myCash/common";
import {
  ExpenseSettings,
  ExpensesHeader,
  ExpensesView,
  SingleExpenseDetails,
  SingleExpenseAttachment,
  ExpensessHeaderSlider,
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
import { useColorMode } from "@myCash/hooks";

interface ExpensesContentProps {}

export const ExpensesContent: React.FC<ExpensesContentProps> = () => {
  const { t } = useTranslation();
  const expense = useSelector((state: RootState) => state.expense);
  const { isLightMode } = useColorMode();
  return (
    <HomeLayout
      leftSide={
        <Stack>
          <ScrollContainer>
            <StyledPadding>
              <Typography variant="h4">{t("expenses.title")}</Typography>
            </StyledPadding>
            <ExpensesHeader />
            <ExpensessHeaderSlider />
            <ExpensesView />
          </ScrollContainer>
        </Stack>
      }
      rightSide={
        <Stack>
          <ScrollContainer>
            <ExpenseSettings />
            <StyledRightSideContainer>
              {!expense?.id ? (
                <CartLogo
                  src={isLightMode ? cartLogo : cartLogoDark}
                  alt="cart-logo"
                />
              ) : (
                <Fading>
                  <SingleExpenseDetails />
                  <SingleExpenseAttachment />
                </Fading>
              )}
            </StyledRightSideContainer>
          </ScrollContainer>
        </Stack>
      }
    />
  );
};
