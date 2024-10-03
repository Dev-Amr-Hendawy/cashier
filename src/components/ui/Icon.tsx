import { Box } from "@mui/material";

type Props = {
  icon: string;
};

const Icon = ({ icon }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      component="img"
      src={icon}
      alt="icon"
    />
  );
};

export default Icon;
