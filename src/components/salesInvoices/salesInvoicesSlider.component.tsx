import { CategoryChip, MainIcon } from "@myCash/common";
import { StyledStack } from "@myCash/common/categorySection/styles";
import { useQuery } from "@tanstack/react-query";
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../apis";
import { RootState } from "../../lib";
import { productsActions } from "../../lib/store/slices/products-slice";
import withSlider from "@myCash/common/mainSlider/mainSlider.common";

export const SalesInvoicesSlider: React.FC = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["categories-random"],
    queryFn: getCategories,
  });
  const expandMainCategories = useSelector((state: RootState) => state.products.expandCategories);
  const dispatch = useDispatch();
  const handleExpanded = () => {
    dispatch(productsActions.setExpandCategories(!expandMainCategories));
  };

  const InvoicesCatSlider = withSlider(CategoryChip);

  return (
    <StyledStack direction="row" spacing={2} alignItems="center">
      <MainIcon
        icon={<MdMenu />}
        bgColor={expandMainCategories ? "secondary" : "white"}
        iconcolor={expandMainCategories ? "white" : "black"}
        size="small"
        outlined={!expandMainCategories}
        onClick={handleExpanded}
      />
      {!isError && <InvoicesCatSlider items={data} loading={isPending} />}
    </StyledStack>
  );
};
