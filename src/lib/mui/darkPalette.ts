import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS

export const grey = {
  0: "#2d2d2d",
  100: "#2d2d2d9c",
  200: "#2D2D2D1A",
  300: "#fff",
  400: "#D9D9D9",
  500: "#2D2D2D66",
  600: "#f4f4f4",
  // 700: "#2D2D2D0D",
  700: "#e0e0e07d",
  800: "#fff",
  900: "#FFFFFF",
};
// main colors

export const primary = {
  lighter: "#D0ECFE",
  light: "#73BAFB",
  main: "#080b41",
  dark: "#0C44AE",
  darker: "#042174",
  contrastText: "#FFFFFF",
};

export const secondary = {
  lighter: "#EFD6FF",
  light: "#C684FF",
  main: "#6EC531",
  dark: "#2e6d01",
  darker: "#27097A",
  contrastText: "#FFFFFF",
};

export const info = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00B8D9",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#FFFFFF",
};

export const success = {
  lighter: "#C8FAD6",
  light: "#5BE49B",
  main: "#00A76F",
  dark: "#007867",
  darker: "#004B50",
  contrastText: "#FFFFFF",
};

export const warning = {
  lighter: "#FFF5CC",
  light: "#FFD666",
  main: "#FFAB00",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: grey[800],
};

export const error = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#E83E00",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#FFFFFF",
};

export const common = {
  white: "#404040",
  black: "#FFFFFF",
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  action,
};

// ----------------------------------------------------------------------

export function darkPalette() {
  return {
    ...base,
    mode: "dark",
    // text: {
    //   primary: grey[800],
    //   secondary: grey[600],
    //   disabled: grey[500],
    // },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
      // neutral: grey[200],
    },
    divider: "#2D2D2D1A",
    action: {
      ...base.action,
      active: grey[600],
    },
  };
}
