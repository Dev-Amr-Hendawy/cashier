import { Typography } from "@mui/material";
import { FilterItem } from "../../types/types";
import { StyledContainer } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../lib";
// import { productsActions } from "../../lib/store/slices/products-slice";

interface HomeFilterItemsProps extends FilterItem {
  clickHandler: () => void;
}

export const HomeFilterItem: React.FC<HomeFilterItemsProps> = ({
  name,
  icon,
  id,
  clickHandler,
}) => {
  // const dispatch = useDispatch();
  // const handleFilter = () => {
  //   dispatch(productsActions.setSort(id));
  // };
  const sortState = useSelector(
    (state: RootState) => state.products.filter.sort
  );
  const selected: boolean = sortState === id;
  return (
    <StyledContainer onClick={clickHandler} active={selected}>
      {icon}
      <Typography variant="h6" color="grey.300">
        {name}
      </Typography>
    </StyledContainer>
  );
};
