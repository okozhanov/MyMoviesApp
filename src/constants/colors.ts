const COLORS = {
  white: "#fff",
  black: "#000",
  grey: "#A3A3A3",
  mainDarkRed: "#FF0037",
  mainLightRed: "#D30F0F",
  darkGray: "#434343",
  lightGray: "#F1F1F1",
  placeholderLight: "#7B7B7B",
  placeholderDark: "#C2C2C2",
  errorLight: "#AE0000",
  errorDark: "#FF859F",
  secondaryLight: "#D9D9D9",
  secondaryDark: "#909090",
  semiTransparentDark: "rgba(150, 150, 150, 0.5)",
  semiTransparentLight: "rgba(0, 0, 0, 0.5)",
};

const COLORS_BY_MODE = {
  light: {
    text: COLORS.darkGray,
    background: COLORS.lightGray,
    placeholder: COLORS.placeholderLight,
    main: COLORS.mainLightRed,
    error: COLORS.errorLight,
    secondary: COLORS.secondaryLight,
    semiTransparent: COLORS.semiTransparentLight,
  },
  dark: {
    text: COLORS.lightGray,
    background: COLORS.darkGray,
    placeholder: COLORS.placeholderDark,
    main: COLORS.mainDarkRed,
    error: COLORS.errorDark,
    secondary: COLORS.secondaryDark,
    semiTransparent: COLORS.semiTransparentDark,
  },
};

export { COLORS_BY_MODE, COLORS };
