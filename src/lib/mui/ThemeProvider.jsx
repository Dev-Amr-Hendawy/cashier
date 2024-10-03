import PropTypes from "prop-types";
import { useLayoutEffect, useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import { CacheProvider } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { cacheLtr, cacheRtl } from "./cache";
import { palette } from "./palette";
import { typography } from "./typography";
import { useColorMode } from "@myCash/hooks";
import { darkPalette } from "./darkPalette.ts";
// import { outlinedInputClasses } from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------
const fontFamilyRtl = "IBM Plex Sans Arabic, sans-serif";
const fontFamilyLtr = "IBM Plex Sans Arabic, sans-serif";

export function ThemeProvider({ children }) {
  const { i18n } = useTranslation();
  let direction = i18n.dir();
  const { isLightMode } = useColorMode();
  const memoizedValue = useMemo(
    () => ({
      direction,
      palette: isLightMode ? palette() : darkPalette(),
      typography: {
        fontFamily: direction === "rtl" ? fontFamilyRtl : fontFamilyLtr,
        ...typography,
      },

      // shape: { borderRadius: 500 },
      components: {
     
      
        MuiTypography: {
          styleOverrides: {
            root: {
              textAlign: "justify",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            borderRadius: 500,
            contained: {
              //if color is primary or secondary make the hover color lighter
              "&:hover": {
                backgroundColor: (props) =>
                  props.color === "primary"
                    ? palette().primary.light
                    : props.color === "secondary"
                    ? palette().secondary.dark
                    : palette().grey[900],
              },
            },
            outlined: {
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            sizeSmall: {
              width: "3rem",
              height: "3rem",
              padding: 4,
            },
            sizeMedium: {
              width: "3.5rem",
              height: "3.5rem",
              padding: 4,
            },
          },
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 1024,
          md: 1280,
          lg: 1440,
          xl: 1650,
        },
      },
    }),
    [direction, isLightMode]
  );

  const theme = createTheme(memoizedValue);

  useLayoutEffect(() => {
    document.body.setAttribute("dir", direction);
    const root = document.querySelector(":root");
    isLightMode
      ? root.classList.remove("dark-mode")
      : root.classList.add("dark-mode");
  }, [direction, isLightMode]);
  return (
    <CacheProvider value={direction === "rtl" ? cacheRtl : cacheLtr}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
