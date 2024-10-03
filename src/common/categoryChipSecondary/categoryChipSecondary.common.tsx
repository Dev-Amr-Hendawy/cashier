import { Tooltip } from "@mui/material";
import React from "react";
import { CategoryArrow } from "../../assets/icons/category-arrow";
import { Category } from "../../types/types";
import { StyledChip } from "./styles";
import { useDispatch } from "react-redux";
import { setSingleCategory } from "../../lib/store/slices/category-slice";

export const CategoryChipSecondary: React.FC<Category> = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setSingleCategory(props));
  };
  return (
    <Tooltip title={props.name} placement="top">
      <StyledChip
        label={props.name}
        icon={<CategoryArrow />}
        variant="outlined"
        active={false}
        onClick={handleClick}
      />
    </Tooltip>
  );
};
