import { Backdrop, CircularProgress } from "@mui/material";

interface BackDropProps {
  open: boolean;
}
export const BackDrop: React.FC<BackDropProps> = ({ open }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
