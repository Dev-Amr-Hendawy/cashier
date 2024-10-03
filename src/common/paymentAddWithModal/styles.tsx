import { ButtonBase, Stack, styled, StackProps } from "@mui/material";

interface Props extends StackProps {
  active?: boolean;
}

export const StyledButtonAddWithModalContainer = styled((props) => (
  <ButtonBase component={Stack} {...props} />
))<Props>(({ theme }) => ({
  backgroundColor: "var(--background-color)",
  padding: "1rem 0",
  width: "100%",
  borderRadius: ".75rem",
  height: "100%",
  border: `2px solid ${theme.palette.grey[500]}`,
  color: theme.palette.grey[300],
  transition: "all .2s ease-in-out",
  "& h6": {
    transition: "all .2s ease-in-out",
    color: theme.palette.grey[300],
  },
  "& svg": {
    color: theme.palette.grey[800],
  },
  "&:hover": {
    cursor: "pointer",
    border: `2px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    "& h6": {
      color: theme.palette.secondary.main,
    },
    "& svg": {
      color: theme.palette.secondary.main,
    },
  },
}));
