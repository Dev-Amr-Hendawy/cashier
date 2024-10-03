import { MainIcon } from "..";
import { StyledStack } from "./styles";

import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { AddClientHoc } from "../../hoc";
import { clearCart } from "../../lib/store/slices/cart-slice";

export const CartHeader = () => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <StyledStack direction="row" justifyContent="space-between">
      <AddClientHoc />
      <MainIcon
        outlined={true}
        bgColor="transparent"
        iconcolor="common.black"
        icon={<CiTrash />}
        onClick={handleClearCart}
      />
    </StyledStack>
  );
};
