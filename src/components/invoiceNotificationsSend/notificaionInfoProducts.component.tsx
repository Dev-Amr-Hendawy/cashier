import { Stack, Typography } from "@mui/material";
import { ProductItemWithCounter } from "@myCash/common";
import { InvoiceProduct } from "@myCash/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AddPriceModal } from "./addPriceModal.component";
import { CardTick1 } from "iconsax-react";

interface NotificationInfoProductsProps {
  products: InvoiceProduct[];
  handleDeleteProduct: (id: number) => void;
  handleProductQuantity: (id: number, amount: number) => void;
  handleProductPrice: (id: number, price: number) => void;
}

export const NotificationInfoProducts: React.FC<
  NotificationInfoProductsProps
> = ({
  products,
  handleDeleteProduct,
  handleProductQuantity,
  handleProductPrice,
}) => {
  const { t } = useTranslation();
  const [addPriceModal, setaddPriceModal] = useState<{
    open: boolean;
    productId: number | null;
  }>({
    open: false,
    productId: null,
  });
  return (
    <Stack>
      <Stack className="notificaion-products-grid">
        <Typography variant="h5" color="grey.400" textAlign="start">
          {t("invoice.processSummary")}
        </Typography>
      
      </Stack>
       <Stack gap={"1rem"} >
      {products &&
        products.length > 0 &&
        products.map((product) => !product?.hasNotification &&(
          // <Stack gap={"0.5rem"} key={product.id}>
          <ProductItemWithCounter
            key={product.id}
            invoiceProduct={product}
            handleDeleteProduct={handleDeleteProduct}
            handleProductQuantity={handleProductQuantity}
          >
            <Typography
              variant="h5"
              color="var(--secondary-main)"
              sx={{textDecoration:"underline"}}
              textAlign="center"
              onClick={() =>
                setaddPriceModal({ open: true, productId: product.id })
              }
            >
              {t("invoice.selectPrice")}
            </Typography>
          </ProductItemWithCounter>
          // </Stack>
        ))}</Stack>
      <AddPriceModal
        hasActions
        open={addPriceModal.open}
        productId={addPriceModal.productId}
        handleClose={() => setaddPriceModal({ open: false, productId: null })}
        title={"invoice.selectPriceItem"}
        icon={<CardTick1 size={32}  color="var(--primary-main)" /> }
        handleProductPrice={handleProductPrice}
      />
    </Stack>
  );
};
