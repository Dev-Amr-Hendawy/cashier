import { CircularProgress, Stack } from "@mui/material";

export const MainLoader = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "30vh",
      }}
    >
      <CircularProgress size={50} />
    </Stack>
  );
};
