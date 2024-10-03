import { Accordion, AccordionDetails, Box, Stack, styled } from "@mui/material";

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  borderRadius: "0px !important",
  cursor: "default",
  backgroundColor: theme.palette.common.white,
  "& :hover": {
    cursor: "default",
  },
  "& .icon-container": {
    cursor: "pointer !important",
    "& svg": {
      marginTop: theme.spacing(1),
      fontSize: "1rem",
    },
  },
  "&.Mui-expanded": {
    margin: "0px !important",
    "& .icon-container": {
      "& svg": {
        color: theme.palette.secondary.main,
        transform: "rotate(-90deg)",
      },
    },
  },
  "&:first-of-type": {
    borderRadius: "0px !important",
  },
  "& .MuiAccordionSummary-root": {
    cursor: "default",
    "&:hover": {
      cursor: "default",
    },
    "&.Mui-focusVisible": {
      // backgroundColor: "black",
    },
  },
}));

export const StyledContentContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  width: "100%",
}));
export const FlexBox = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: ".5rem",
});

export const DeleteItemImg = styled("img")(() => ({
  cursor: "pointer",
  "&:hover": {
    opacity: ".8",
    cursor: "pointer",
  },
}));

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "1fr 2fr",
  padding: "2rem 1rem",
  gap: "1rem",
  "& .Mui-focused": {
    color: "#6EC531 !important",
  },
}));
