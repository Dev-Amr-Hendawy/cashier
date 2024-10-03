// ----------------------------------------------------------------------

type ResponsiveFontSizes = {
  sm: string;
  md: string;
  lg: string;
};

export function responsiveFontSizes({ sm, md, lg }: ResponsiveFontSizes) {
  return {
    "@media (min-width:1024px)": {
      fontSize: sm,
    },
    "@media (min-width:1280px)": {
      fontSize: md,
    },
    "@media (min-width:1440px)": {
      fontSize: lg,
    },
  };
}

// ----------------------------------------------------------------------

export const typography = {
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,

  h1: {
    fontSize: "2.5rem",

    fontWeight: 600,
    // ...responsiveFontSizes({
    //   sm: "2rem",
    //   md: "2.25rem",
    //   lg: "2.5rem", // 40px
    // }),
  },
  h2: {
    fontSize: "2.25rem",
    fontWeight: 600,
    // ...responsiveFontSizes({
    //   sm: "1.75rem",
    //   md: "2rem",
    //   lg: "2.25rem", // 36px
    // }),
  },
  h3: {
    fontSize: "2rem",
    fontWeight: 600,
    // ...responsiveFontSizes({
    //   sm: "1.5rem",
    //   md: "1.75rem",
    //   lg: "2rem",
    // }),
  },
  h4: {
    fontSize: "1.5rem", // 24px
    fontWeight: 600,
    // ...responsiveFontSizes({
    //   sm: "1rem",
    //   md: "1.25rem",
    //   lg: "1.5rem",
    // }),
  },
  h5: {
    fontSize: "1.25rem", // 20px
    fontWeight: 600,
    // ...responsiveFontSizes({
    //   sm: "0.875rem",
    //   md: "1rem",
    //   lg: "1.25rem",
    // }),
  },
  h6: {
    fontSize: "1rem", // 16px
    fontWeight: 600,
    // ...responsiveFontSizes({
    //   sm: "0.75rem",
    //   md: "0.875rem",
    //   lg: "1rem",
    // }),
  },
  subtitle1: {
    fontSize: "1.5rem", // 24px
    fontWeight: 400,
    // ...responsiveFontSizes({
    //   sm: "1rem",
    //   md: "1.25rem",
    //   lg: "1.5rem",
    // }),
  },
  subtitle2: {
    fontSize: ".875rem", // 14
    fontWeight: 600,
    // ...responsiveFontSizes({
    //   sm: "0.875rem",
    //   md: "1rem",
    //   lg: "1.25rem",
    // }),
  },
  body1: {
    fontSize: "1.25rem", // 20px
    fontWeight: 400,
    // ...responsiveFontSizes({
    //   sm: "1rem",
    //   md: "1.25rem",
    //   lg: "1.5rem",
    // }),
  },
  body2: {
    fontSize: "1rem", // 16px
    fontWeight: 400,
    // ...responsiveFontSizes({
    //   sm: "0.75rem",
    //   md: "0.875rem",
    //   lg: ".875rem",
    // }),
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: "1.25rem",
    textTransform: "unset",
  },
};
