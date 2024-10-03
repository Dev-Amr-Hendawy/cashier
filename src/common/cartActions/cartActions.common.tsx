import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/form/Button";
import { StyledCartActionsContainer } from "./styles";
import { useDispatch } from "react-redux";
import { clearCart } from "@myCash/lib";

export const CartActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <StyledCartActionsContainer>
      <Button
        variant="contained"
        color="primary"
        text={t("invoice.continue")}
        onClick={() => {
          navigate("/payment");
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        text={t("invoice.cancel")}
        onClick={() => dispatch(clearCart())}
      />
    </StyledCartActionsContainer>
  );
};
