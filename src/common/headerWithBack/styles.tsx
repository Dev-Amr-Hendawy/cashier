import { Stack, styled } from "@mui/system";

export const StyledModalHeader = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[500]}`,
  padding: "1rem 1.5rem",
  width: "100%",
  backgroundColor: 'var(--primary-primary50)',
}));
