import { Box, TextField } from "@mui/material";
import React from "react";

type Props = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?:boolean
};

export const CartItemTextField: React.FC<Props> = ({ value, onChange,disabled }) => {
  return (
    <Box sx={{ width: "70px" }}>
      <TextField
        size="small"
        value={value}
        disabled={disabled}
        onChange={onChange}
        variant="outlined"
        color="secondary"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: ".75rem",
            "& .MuiOutlinedInput-input": {
              textAlign: "center",
            },
          },
        }}
      />
    </Box>
  );
};
