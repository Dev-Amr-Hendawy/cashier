import { useSearchParams } from "react-router-dom";
import { Category } from "../../types/types";
import { StyledChip } from "./styles";

export const CategoryChip: React.FC<Category> = ({ name, id, selected }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCategoryClick = (id: number) => {
    if (searchParams.get("cat_id") === String(id) || selected) {
      setSearchParams({});
      return;
    }
    setSearchParams({ ...searchParams, cat_id: String(id) });
  };
  return (
    <StyledChip
      variant="outlined"
      label={name}
      active={
        searchParams.get("cat_id") === String(id) || selected ? true : false
      }
      onClick={() => {
        handleCategoryClick(id);
      }}
    />
  );
};
