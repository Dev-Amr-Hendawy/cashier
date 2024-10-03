import { ThemeOptions, createTheme, Palette } from "@mui/material/styles";

// main colors
const primaryColor = "#232773";
const secondaryColor = "#6EC531";
const errorColor = "#E83E00";
const blackColor = "#2d2d2d";
const blackColorLight = "#2d2d2d9c";

//typescript interface
interface IPalette extends Palette {
  black: {
    main: string;
    light: string;
  };
}

interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

// main theme
const mainSettings = {
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    black: {
      main: blackColor,
      light: blackColorLight,
    },
    error: {
      main: errorColor,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "Poppins",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,

    h1: {
      fontSize: "2.5rem", // 40px
      fontWeight: 600,
    },
    h2: {
      fontSize: "2.25rem", // 36px
      fontWeight: 600,
    },
    h3: {
      fontSize: "2rem", // 32px
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem", // 24px
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem", // 20px
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem", // 16px
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1.5rem", // 24px
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "1.25rem", // 20px
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem", // 16px
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem", // 14px
      fontWeight: 400,
    },
  },
};

// LTR theme
const ltrTheme = createTheme({
  ...mainSettings,
} as IThemeOptions);

// RTL theme
const rtlTheme = createTheme({
  direction: "rtl",
  ...mainSettings,
} as IThemeOptions);

export { ltrTheme, rtlTheme };
