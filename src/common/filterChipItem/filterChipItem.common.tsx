import "./styles.scss";

import { Chip } from "@mui/material";

interface Props {
  name: string;
  id: number;
  selected?: boolean;
  handleClick: (id: number) => void;
  fullWidth?: boolean;
}
export const FilterChipItem: React.FC<Props> = ({ name, id, selected, handleClick, fullWidth = false }) => {
  return (
    <Chip
      className={`filter-chip-item ${selected ? "selected" : ""} ${fullWidth ? "full-width" : ""}`}
      label={name}
      variant="outlined"
      onClick={() => {
        handleClick(id);
      }}
    />
  );
};
