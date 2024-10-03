import { RootState } from "@myCash/lib";
import { useSelector } from "react-redux";

export const useColorMode = () => {
  const { colorMode } = useSelector((state: RootState) => state.layout);
  const isLightMode = colorMode === "light";
  return { colorMode, isLightMode };
};
