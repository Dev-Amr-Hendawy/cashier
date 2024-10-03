import { useNavigate } from "react-router-dom";
import { HomeProductsIcons, SearchField } from "..";
import { StyledHeaderStack } from "./styles";
import { CreateProductByAiModal } from "../createProductByAiModal";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

export const HomeProductsHeader = () => {
  const navigate = useNavigate();
  const user = useSelector ((state: RootState) => state.user.user);
  
  return (
    <StyledHeaderStack direction="row" alignItems="center" spacing={1}>
      <SearchField handleSubmit={(v) => navigate(`?searchText=${v}`)} />
      <HomeProductsIcons />
     {user?.id===1181&& <CreateProductByAiModal />}
    </StyledHeaderStack>
  );
};
