import { AccountMenu } from "../accountMenu";
import Button from "../../components/form/Button";
import { ROUTES } from "@myCash/constants";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

export const HeaderActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user?.user);
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {user?.accountInfo?.quickInvoice ? (
        <Button
          variant="contained"
          color="secondary"
          text={t("header.immediateInvoice")}
          width="14rem"
          onClick={() => {
            navigate(ROUTES.QUICK_INVOICE);
          }}
        />
      ) : null}

      <AccountMenu />
    </Stack>
  );
};
