import Button from "@myCash/components/form/Button";

import { getManyProductsAi } from "@myCash/apis";
import { addManyProductsAi } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Stack } from "@mui/material";
import { CircularLoader } from "../circularLoader";

export const CreateProductByAiModal = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProductsAi = async () => {
    setIsLoading(true);
    try {
      await getManyProductsAi().then((products) => {
        const productsCart = products.map((product) => ({
          id: product.id,
          name: product.name,
          productPrice: product.productPrice,
          productPriceAfterDiscount: product.productPriceAfterDiscount,
          cartQuantity: 1,
          cartDiscount: product?.detected_quantity?Number(product?.detected_quantity):1,
          cartDiscountType: "2",
          discountPrice: product.discountPrice,
          price: product.price,
          taxAvailable: product.taxAvailable,
          quantity: Number(product.quantity),
          buyPrice: product.buyPrice,
          buyTaxAvailable: product.buyTaxAvailable,
          buyTaxPrice: product.buyTaxPrice,
        }));

        dispatch(addManyProductsAi(productsCart));
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        text={"AI"}
        color="primary"
        onClick={handleAddProductsAi}
        width="5rem"
      />
     {isLoading && (
  <Stack
    sx={{
      position: "fixed",
      top: 0,                // Make sure the card starts from the top
      left: 0,               // Ensure it starts from the left
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundColor: "#ffffff55",
      zIndex: 999,
      display: "flex",
      alignItems: "center",   // Fixed typo here
      justifyContent: "center"
    }}
  >
    <CircularLoader size={"15vw"} />
  </Stack>
)}
    </>
  );
};
