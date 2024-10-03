import { AccordionSummary, Box, Typography } from "@mui/material";
import {
  DeleteItemImg,
  FlexBox,
  StyledAccordion,
  StyledContentContainer,
} from "./styles";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
  setQuantity,
} from "../../lib/store/slices/cart-slice";
import { memo, useState } from "react";

import { CartItemTextField } from "../cartItemTextField";
import { CartProduct } from "../../types/types";
import { CartSummaryFormHoc } from "../../hoc/cartSummaryForm";
import Fading from "../../components/ui/animation/Fading";
import { MainIcon } from "..";
import { SlArrowLeft } from "react-icons/sl";
import deleteItemImg from "../../assets/images/delete-cart-item.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

type Props = CartProduct;

const MemoizedCartSingleItem = ({
  name,
  // productPriceAfterDiscount,
  id,
  cartQuantity,
  productPrice,
  quantity,
  buyPrice,
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.cart);
  const handleIncrement = () => {
    if (cartState.invoiceType === 1 && cartQuantity >= Number(quantity)) return;
    dispatch(increaseQuantity(id));
  };
  const handleDecrement = () => {
    if (cartQuantity === 1) {
      dispatch(deleteProduct(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };
  const handleDelete = () => {
    dispatch(deleteProduct(id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      isNaN(Number(e.target.value)) ||
      Number(e.target.value) <= 0 ||
      // check if invoice type is only sell, limit quantity to stock, else in buy open quantity limit
      (cartState.invoiceType === 1
        ? Number(e.target.value) > Number(quantity)
        : false)
    )
      return;
    dispatch(setQuantity({ id, quantity: Number(e.target.value) }));
  };
  return (
    <Fading>
      {/* check if invoice type is sell, close the accordion functionality */}
      <StyledAccordion
        expanded={cartState.invoiceType === 1 ? expanded : false}
      >
        <AccordionSummary>
          <StyledContentContainer>
            <FlexBox onClick={handleToggle} sx={{ cursor: "pointer" }}>
              {cartState.invoiceType === 1 && (
                <Box className="icon-container">
                  <SlArrowLeft />
                </Box>
              )}
              <Typography variant="h5" color="grey.900">
                {name}
              </Typography>
            </FlexBox>

            <FlexBox justifyContent="center">
              <MainIcon
                iconcolor="white"
                icon={<FaPlus />}
                bgColor={
                  cartState.invoiceType === 1
                    ? cartQuantity >= Number(quantity)
                      ? "common.black"
                      : "secondary"
                    : "secondary"
                }
                size="small"
                onClick={handleIncrement}
                disabled={
                  // check if invoice type is sell, disable the increase button
                  cartState.invoiceType === 1
                    ? cartQuantity >= Number(quantity)
                    : false
                }
              />
              <CartItemTextField value={cartQuantity} onChange={handleChange} />
              <MainIcon
                iconcolor="white"
                icon={<FaMinus />}
                bgColor="secondary"
                size="small"
                onClick={handleDecrement}
              />
            </FlexBox>
            <FlexBox justifyContent="flex-end">
              <Typography variant="h4" color="grey.900">
                {cartState.invoiceType === 1 ? productPrice : buyPrice}
              </Typography>
              <DeleteItemImg
                src={deleteItemImg}
                alt="delete-item"
                onClick={handleDelete}
              />
            </FlexBox>
          </StyledContentContainer>
        </AccordionSummary>
        {/* show discount in only sell invoice type */}
        {cartState.invoiceType === 1 && (
          <CartSummaryFormHoc
            cartQuantity={cartQuantity}
            handleChange={handleChange}
            productId={id}
          />
        )}
      </StyledAccordion>
    </Fading>
  );
};

export const CartSingleItem = memo(MemoizedCartSingleItem);
