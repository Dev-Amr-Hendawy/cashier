import { Box, CardActionArea, styled } from "@mui/material";

interface StyledHomeProductsProps {
  // columns: 4 | 5;
}

export const StyledHomeSingleProducts = styled(
  (props: StyledHomeProductsProps) => (
    <Box component={CardActionArea} {...props} />
  )
)(({ theme }) => ({
  backgroundColor: "#FFF",
  borderRadius: "1rem",
  overflow: "hidden",
  position: "relative",
  boxShadow: "0px 2px 8px #1E1E1E14",
  padding: "0rem 0rem 1rem",
  height: "100%",
  "& .MuiStack-root": {
    "& .MuiBox-root": {
      alignSelf: "center",
    },
    "& .MuiStack-root": {
      "& .MuiStack-root": {
        flexDirection: "row",
        justifyContent: "space-between",
        "& .MuiBox-root": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "2px",
        },
        "& .MuiTypography-root:first-of-type": {
          color: theme.palette.secondary.main,
          fontSize: "1.125rem",
          fontWeight: 800,
        },
        "& .MuiTypography-root:nth-of-type(2)": {
          color: theme.palette.secondary.main,
          fontSize: "0.625rem",
          fontWeight: 700,
        },
        "& .MuiBox-root:nth-of-type(2)": {
          "& .MuiTypography-root:first-of-type": {
            textDecorationLine: "line-through",
            color: "rgba(45, 45, 45, 0.60)",
            fontSize: "0.875rem",
            fontWeight: 600,
          },
          "& .MuiTypography-root:nth-of-type(2)": {
            textDecorationLine: "line-through",
            color: "rgba(45, 45, 45, 0.60)",
            fontSize: "0.625rem",
            fontWeight: 700,
          },
        },
      },
    },
  },
}));

export const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: theme.spacing(20),
  //center the image
}));
