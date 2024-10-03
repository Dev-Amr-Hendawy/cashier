import { IconButton } from "@mui/material";
import { RootState, toggleColorMode } from "@myCash/lib";
import { Moon, Sun1 } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";

interface ColorModeButtonProps {
  position?: "absolute" | "relative";
}

export const ColorModeButton: React.FC<ColorModeButtonProps> = ({
  position = "absolute",
}) => {
  const colorMode = useSelector((state: RootState) => state.layout.colorMode);
  const dispatch = useDispatch();
  const toggleColorHandler = () => {
    dispatch(toggleColorMode());
  };
  return (
    <IconButton
      onClick={toggleColorHandler}
      sx={{
        position: position,
        top: position === "absolute" ? "3.5rem" : "unset",
        left: {
          xs: position === "absolute" ? "12rem" : "unset",
          xl: position === "absolute" ? "14rem" : "unset",
        },
      }}
    >
      {colorMode === "light" ? (
        <Moon size={45}/>
      ) : (
        <Sun1 size={45}  color="#fff" />
      )}
    </IconButton>
  );
};
