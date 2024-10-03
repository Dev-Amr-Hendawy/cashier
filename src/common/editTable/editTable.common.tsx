import { FlexBox } from "../cartSingleItem/styles";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Stack, Typography } from "@mui/material";
import {
  decreaseProductQuantity,
  deleteProductFromInvoice,
  increaseProductQuantity,
} from "@myCash/lib";

import { CartItemTextField } from "../cartItemTextField";
import { InvoiceProduct } from "@myCash/types";
import { MainIconSquare } from "..";
import { StyledEditTableHeader } from "./styles";
// import deleteItemImg from "../../assets/images/delete-cart-item.svg";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Trash } from "iconsax-react";

interface EditTableProps {
  products: InvoiceProduct[];
}

export const EditTable: React.FC<EditTableProps> = ({ products }) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <StyledEditTableHeader>
        <Typography variant="h5" color="grey.400" textAlign="start">
          {t("product")}
        </Typography>
        <Typography variant="h5" color="grey.400" textAlign="center">
          {t("quantity")}
        </Typography>
        <Typography variant="h5" color="grey.400" textAlign="end">
          {t("price")}
        </Typography>
      </StyledEditTableHeader>
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <TableRow key={product.id} invoiceProduct={product} />
        ))}
      {/* <StyledEditTableHeader>
        <Typography variant="h5" color="grey.900" textAlign="start">
          منتج 1
        </Typography>

        <FlexBox justifyContent="center">
          <MainIcon
            iconcolor="white"
            icon={<FaPlus />}
            bgColor="secondary"
            size="small"
            onClick={() => {}}
          />
          <CartItemTextField value={500} onChange={() => {}} />
          <MainIcon
            iconcolor="white"
            icon={<FaMinus />}
            bgColor="secondary"
            size="small"
            onClick={() => {}}
          />
        </FlexBox>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Stack>
            <Typography variant="h5" color="grey.900" textAlign="end">
              {1500}
            </Typography>
          </Stack>
          {<DeleteItemImg src={deleteItemImg} alt="delete-item" />}
        </Stack>
      </StyledEditTableHeader> */}
    </Stack>
  );
};

interface TableRowProps {
  invoiceProduct: InvoiceProduct;
}

const TableRow: React.FC<TableRowProps> = ({ invoiceProduct }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <StyledEditTableHeader>
      <Typography variant="h5" color="grey.900" textAlign="start">
        {invoiceProduct.product.name}
      </Typography>

      <FlexBox justifyContent="center">
        <MainIconSquare
          iconcolor="white"
          icon={<FaPlus />}
          bgColor="primary"
          size="small"
          onClick={() => {
            dispatch(increaseProductQuantity(invoiceProduct.id));
          }}
        />
        <CartItemTextField
          value={Number(invoiceProduct.quantity)}
          onChange={() => {}}
        />
        <MainIconSquare
          iconcolor="white"
          icon={<FaMinus />}
          bgColor="primary"
          size="small"
          onClick={() => {
            dispatch(decreaseProductQuantity(invoiceProduct.id));
          }}
        />
          <MainIconSquare
          iconcolor="white"
          icon={<Trash color="#FF8A65" />}
          bgColor="grey"
          outlined
          size="small"
          onClick={() => {
            dispatch(deleteProductFromInvoice(invoiceProduct.id));
          }}
        />
    
      </FlexBox>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Typography variant="h5" color="grey.900" textAlign="end">
          {invoiceProduct.totalPrice}
        </Typography>
        <Typography variant="h5" color="grey.900" textAlign="end">
          {t("currency")}
        </Typography>
      </Stack>
    </StyledEditTableHeader>
  );
};
