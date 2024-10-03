import { MdMenu } from "react-icons/md";
import { MainIcon } from "..";
import { CategorySlider } from "../categorySlider";
import { StyledStack } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib";
import { productsActions } from "../../lib/store/slices/products-slice";

export const CategorySection: React.FC = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["categories-random"],
    queryFn: getCategories,
  });
  const expandMainCategories = useSelector((state: RootState) => state.products.expandCategories);
  const dispatch = useDispatch();
  const handleExpanded = () => {
    dispatch(productsActions.setExpandCategories(!expandMainCategories));
  };

  return (
    <StyledStack direction="row" spacing={2} alignItems="center">
      <MainIcon
        icon={<MdMenu />}
        bgColor={expandMainCategories ? "secondary" : "common.white"}
        iconcolor={expandMainCategories ? "common.white" : "common.black"}
        size="small"
        outlined={!expandMainCategories}
        onClick={handleExpanded}
      />

      {!isError && <CategorySlider categories={data} loading={isPending} />}
    </StyledStack>
  );
};
