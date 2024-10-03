import { Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { CiGrid41 } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { SlRefresh } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { HomeFilterModal, MainIcon } from "..";
import { PRODUCTS_QUERY_KEY } from "../../constants";
import { changeProductsColumns } from "../../lib/store/slices/layoutSlice";
import { productsActions } from "../../lib/store/slices/products-slice";

export const HomeProductsIcons: React.FC = () => {
  const dispatch = useDispatch();
  const productColumns = useSelector(
    (state: { layout: { productColumns: 4 | 5 } }) =>
      state.layout.productColumns
  );
  const handleProductColumns = () => {
    dispatch(changeProductsColumns());
  };

  const handleAddProduct = () => {
    dispatch(productsActions.openProductsForm());
  };

  const queryClient = useQueryClient();
  return (
    <Stack
      direction="row"
      sx={{
        gap: ".5rem",
      }}
    >
      <MainIcon
        icon={<FiPlus />}
        bgColor="primary"
        iconcolor="white"
        onClick={handleAddProduct}
      />
      <HomeFilterModal />
      <MainIcon
        icon={<SlRefresh />}
        bgColor="grey"
        iconcolor="common.black"
        onClick={() => {
          dispatch(productsActions.clearSorting());
          queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
        }}
      />
      <MainIcon
        icon={<CiGrid41 />}
        bgColor={productColumns === 4 ? "grey" : "secondary"}
        iconcolor={productColumns === 4 ? "common.black" : "common.white"}
        onClick={handleProductColumns}
      />
    </Stack>
  );
};
