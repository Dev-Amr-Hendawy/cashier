import { Box } from "@mui/material";
import { MainIcon, SearchField } from "@myCash/common";
import { StyledHeaderStack } from "@myCash/common/homeProductsHeader/styles";
import { Setting5 } from "iconsax-react";
import { SlRefresh } from "react-icons/sl";
import repoIcon from "../../assets/icons/repo.svg";

export const SalesInvoicesHeader = () => {
  return (
    <StyledHeaderStack direction={"row"} spacing={1} alignItems={"center"} justifyContent="center">
      <SearchField />
      <MainIcon icon={<Setting5 variant="TwoTone" />} bgColor="grey" iconcolor="black" onClick={() => {}} />
      <MainIcon icon={<SlRefresh />} bgColor="grey" iconcolor="black" onClick={() => {}} />
      <MainIcon
        icon={<Box component="img" src={repoIcon} alt="repo" />}
        bgColor="grey"
        iconcolor="black"
        onClick={() => {}}
      />
    </StyledHeaderStack>
  );
};
