import { Box, Stack, Typography } from "@mui/material";
import { Product, editInitialValuesType } from "../../types/types";
import { StyledHomeSingleProducts, StyledImage } from "./styles";
import {
  addProduct,
  increaseQuantity,
} from "../../lib/store/slices/cart-slice";
import { useDispatch, useSelector } from "react-redux";

import { ConfirmProvider } from "material-ui-confirm";
import { HomeSingleProductMenu } from "../homeSingleProductMenu";
import MobileImage from "../../assets/images/profile-logo.svg";
import React from "react";
import { RootState } from "../../lib";
// import { SingleProductBadge } from "../singleProductBadge/singleProductBadge";
import { defaultDialogOptions } from "../../constants";
import { motion } from "framer-motion";
import { useLongPress } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";
import { SingleProductTags } from "../singleProductTags";
import { toast } from "react-toastify";

type ProductComponent = Product & {
  lastItemRef?: null | ((node?: Element | null) => void) | undefined;
  handleEditModal: (product: editInitialValuesType) => void;
};

const HomeSingleProductNotMemoized: React.FC<ProductComponent> = function ({
  lastItemRef, name, productPrice, productPriceAfterDiscount, id, image, desc,
   barCode, quantity, taxAvailable, taxType, cat, discount, hasDiscount, discountType,
    handleEditModal, discountPrice, price, buyPrice, buyTaxAvailable, buyTaxType, buyTaxPrice, branch
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.cart);
  const isInCart = cartState.products.find((product) => product.id === id);

  //menu logic
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  // long press logic
  const attrs = useLongPress(
    (e) => {
      setAnchorEl(e.target as HTMLElement);
    },
    {
      //add to cart
      onCancel: () => {
        setAnchorEl(null);
      },
      //   if (isInCart) {
      //     dispatch(increaseQuantity(id));
      //   } else {
      //     dispatch(
      //       addProduct({
      //         id,
      //         name,
      //         productPrice,
      //         productPriceAfterDiscount,
      //         cartQuantity: 1,
      //         cartDiscount: undefined,
      //         cartDiscountType: "2",
      //         discountPrice,
      //         price,
      //         taxAvailable,
      //       })
      //     );
      //   }
      // },
      threshold: 1000,
    }
  );

  return (
    <motion.div
      layout
      ref={lastItemRef}
      style={{
        border: isInCart ? "2px solid #6EC531" : "2px solid #fff",
        borderRadius: "1rem",
      }}
      onClick={() => {
        if (anchorEl) return;
        if (Number(quantity) === 0) return toast.error(t("outOfStock"));
        if (isInCart) {
          if (isInCart.cartQuantity >= Number(quantity)) return;
          dispatch(increaseQuantity(id));
        } else {

          dispatch(
            addProduct({
              id,
              name,
              productPrice,
              productPriceAfterDiscount,
              cartQuantity: 1,
              cartDiscount: undefined,
              cartDiscountType: "2",
              discountPrice,
              price,
              taxAvailable,
              quantity,
              buyPrice,
              buyTaxAvailable,
              buyTaxPrice,
            })
          );
        }
      } }
    >
      <StyledHomeSingleProducts {...attrs}>
        {/* tag */}
        <SingleProductTags
          discount={discount}
          discountType={discountType}
          hasDiscount={hasDiscount}
          quantity={quantity} />

        <Stack spacing={1.5}>
          {/* imgae */}
          <StyledImage
            src={image != "https://mycashback.mycashtest.com/images/1.png"
              ? image
              : MobileImage}
            loading="lazy"
            sx={{
              objectFit: image != "https://mycashback.mycashtest.com/images/1.png"
                ? "cover"
                : "unset",
            }}
            alt="mobile" />
          <Stack spacing={0.5} sx={{ padding: "0 .5rem" }}>
            <Typography variant="h6" color={"black"}>
              {name}
            </Typography>
            {/* price */}
            <Stack>
              <Box>
                <Typography variant="h6">
                  {Number(productPriceAfterDiscount).toLocaleString()}
                </Typography>
                <Typography sx={{ fontSize: ".75rem !important" }}>
                  {t("currency")}
                </Typography>
              </Box>
              {hasDiscount === 1 && (
                <Box>
                  <Typography>
                    {" "}
                    {Number(productPrice).toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </Stack>
        {/* Menu */}
      </StyledHomeSingleProducts>
      <ConfirmProvider
        defaultOptions={{
          ...defaultDialogOptions,
        }}
      >
        <HomeSingleProductMenu
          id={id}
          open={open}
          handleClose={handleClose}
          anchorEl={anchorEl}
          handleEditModal={() => {
            handleEditModal({
              product_id: id.toString(),
              image: image,
              name: name,
              desc: desc||"",
              barCode: barCode || "",
              price: productPrice,
              quantity: quantity,
              category: "",
              //eslint-disable-next-line
              hasDiscount: discount && hasDiscount ? hasDiscount.toLocaleString() : "0",
              discountType: discountType || "",
              discount: discount || "",
              taxAvailable: String(taxAvailable),
              taxType: taxAvailable === 1 ? String(taxType) : "0",
              parentCat_id: cat?.id?.toString() || "",
              cat_id: "",
              product_add_sort: "",
              defaultCategory: cat,
              buyPrice,
              buyTaxAvailable: String(buyTaxAvailable),
              buyTaxType: buyTaxAvailable === 1 ? String(buyTaxType) : "0",
              branch_id: branch ? branch.id : null,
            });
          } } />
      </ConfirmProvider>
      {/* <EditProductModal
              open={openEditModal}
              handleClose={handleCloseEditModal}
              initialValues={{
                product_id: id.toString(),
                image: image,
                name: name,
                desc: desc,
                barCode: barCode || "",
                price: productPrice,
                quantity: quantity,
                category: "",
                hasDiscount: "",
                discountType: "",
                discount: "",
                taxAvailable: taxAvailable,
                taxType: taxAvailable === "1" && taxType === "1" ? "2" : taxAvailable === "1" ? "3" : "1",
                parentCat_id: cat?.id?.toString() || "",
                cat_id: "",
                product_add_sort: "",
                defaultCategory: cat,
              }}
            /> */}
    </motion.div>
  );
};

export const HomeSingleProduct = React.memo(HomeSingleProductNotMemoized);
