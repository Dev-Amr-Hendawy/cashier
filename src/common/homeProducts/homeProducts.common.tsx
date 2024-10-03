import { HomeSingleProduct, ProductSkeleton } from "..";
import { Product, editInitialValuesType } from "../../types/types";
import { StyledHomeProducts, StyledMainContainer } from "./styles";

import { CircularProgress } from "@mui/material";
import { EditProductModal } from "../productModal/editProductModal.common";
import { useProducts } from "../../hooks";
import { useSelector } from "react-redux";
import { useState } from "react";

interface HomeProductsProps {}

export const HomeProducts: React.FC<HomeProductsProps> = () => {
  const productColumns = useSelector(
    (state: { layout: { productColumns: 4 | 5 } }) =>
      state.layout.productColumns
  );

  const { data, error, isFetchingNextPage, isPending, isRefetching, ref } =
    useProducts();
  const [editModalInitialValues, setEditModalInitialValues] = useState<
    editInitialValuesType | undefined
  >(undefined);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditModalInitialValues(undefined);
  };
  const handleEditModal = (product: editInitialValuesType) => {  
    setEditModalInitialValues(product);
    setEditModalOpen(true);
  };
  const renderProducts = (page: Product[], index: number) => {
    return page.map((product: Product) => {
      let lastItemRef = null;
      if (data?.pages?.length) {
        lastItemRef = index === data?.pages?.length - 1 ? ref : null;
      }
      return (
        <HomeSingleProduct
          key={product.id}
          lastItemRef={lastItemRef}
          handleEditModal={handleEditModal}
          {...product}
        />
      );
    });
  };

  if (error) return <div>Error</div>;

  return (
    <StyledMainContainer>
      <StyledHomeProducts columns={productColumns}>
        {isPending || isRefetching
          ? Array.from({ length: 20 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : null}
        {!isRefetching &&
          data?.pages?.map((page, index) => {
            return renderProducts(page, index);
          })}
      </StyledHomeProducts>
      {isFetchingNextPage && (
        <CircularProgress
          size={40}
          color="secondary"
          sx={{ margin: "0 auto" }}
        />
      )}
      {editModalInitialValues && (
        <EditProductModal
          open={editModalOpen}
          initialValues={editModalInitialValues}
          handleClose={handleCloseEditModal}
        />
      )}
    </StyledMainContainer>
  );
};
