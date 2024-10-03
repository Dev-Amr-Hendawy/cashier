import { Stack, styled } from "@mui/material";
import { SingleProductBadgeProps } from "./singleProductBadge";

export const StyledSingleProductBadge = styled(Stack)<SingleProductBadgeProps>(
  ({ backgroundColor }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    position: "absolute",
    left: "0",
    top: "8px",
    borderRadius: "0px 106.882px 106.882px 0px",
    height: "2rem",
    padding: "12px 0.5rem",
    backgroundColor: backgroundColor,
    color: "#fff",
  })
);
