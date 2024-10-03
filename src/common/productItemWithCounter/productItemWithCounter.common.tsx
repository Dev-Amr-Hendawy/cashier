import React from "react";

import { InvoiceProduct } from "@myCash/types";
import { Box, Stack, Typography } from "@mui/material";

import ProductLogo from "../../assets/images/cart-logo.svg";
import "./styles.scss";
import { CartItemTextField } from "../cartItemTextField";
import { Trash } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { MainIconSquare } from "../mainIcon";

interface ProductItemWithCounterProps {
  invoiceProduct: InvoiceProduct;
  handleDeleteProduct: (id: number) => void;
  handleProductQuantity?: (id: number, amount: number) => void;
  children?: React.ReactNode;
}

export const ProductItemWithCounter: React.FC<ProductItemWithCounterProps> = ({
  invoiceProduct,
  handleDeleteProduct,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <Stack className="product-item-counter container-border-padding">
      <Box display={"flex"} gap={2}>
        <Box
          component={"img"}
          src={
            invoiceProduct.product.image !=
            "https://mycashback.mycashtest.com/images/1.png"
              ? invoiceProduct.product.image
              : ProductLogo
          }
          loading="lazy"
          sx={{
            width: "6.25rem",
            height: "6.25rem",
            borderRight: "1px solid var(--grey-500)",
            objectFit:
              invoiceProduct.product.image !=
              "https://mycashback.mycashtest.com/images/1.png"
                ? "contain"
                : "unset",
          }}
          alt="mobile"
        />
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="h5" color="grey.900" textAlign="start">
            {invoiceProduct.product.name}
          </Typography>
        </Box>
      </Box>
      <Stack justifyContent="center" className="counter-container" gap={3}>
        
        <Stack justifyContent="center" className="counter-container" gap={1}>
          <Typography variant="h5" color="grey.900" textAlign="start">
            {t("quantity")}
          </Typography>
          <Stack>
            <CartItemTextField
              value={Number(invoiceProduct.quantity)}
              onChange={() => {}}
            />
          </Stack>
          <MainIconSquare
            iconcolor="transparent"
            icon={<Trash color="#FF8A65" />}
            bgColor="transparent"
            size="small"
            onClick={() => handleDeleteProduct(invoiceProduct?.id)}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          justifySelf="center"
          justifyContent="flex-end"
          sx={{ cursor: "pointer" }}
        >
          {children && children}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
          <Stack direction={"row"}>
            <Typography variant="h5" color="var(--primary-main)">
              
              {t("productPrice")}:
            </Typography>
            <Typography variant="h5" color="grey.900">
              {invoiceProduct.product.price} {t("currency")}
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            <Typography variant="h5" color="var(--primary-main)">
              {t("invoice.difference")} :
            </Typography>
            <Typography variant="h5" color="var(--secondary-main)">
              {Number(invoiceProduct.notificationPrice)===0?invoiceProduct.notificationPrice:Math.trunc(Number(invoiceProduct.notificationPrice)) } {t("currency")}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
