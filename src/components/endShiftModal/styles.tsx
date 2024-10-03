import { styled } from "@mui/material";
import TextField from "../form/TextField";

export const StyledIconTextField = styled(TextField)(() => ({
  "&.MuiOutlinedInput-input": {
    borderLeft: `2px solid green !important`,
  },
}));
