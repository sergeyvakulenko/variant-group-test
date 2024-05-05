export const APP_COLORS = {
  green: "#087443",
  darkBlue: "#344054",
  grey: "#475467",

  backgroundGreen: "#edfcf2",
  backgroundGrey: "#f2f4f7",

  successGreen: "#73e2a3",
  errorRed: "#fda29b",

  shadowGrey: "#1018280d",
  shadowGreen: "#d3f8df",
  shadowRed: "#fee4e2",

  headingGrey: "#101828",
  textGrey: "#667085",
  disabledGrey: "#98a2b3",
  headerBorderGrey: "#eaecf0", // Why? Why not #d0d5dd? Talk to a designer!
  borderGrey: "#d0d5dd",

  white: "#ffffff",
} as const;

export const APP_FONTS = {
  default: "FixelText",
  heading: "FixelDisplay",
};

export const APP_FONT_SIZES = {
  s: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
  },
  m: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "28px",
  },
  l: {
    fontSize: "35px",
    fontWeight: 600,
    lineHeight: "44px",
  },
  xl: {
    fontSize: "48px",
    fontWeight: 600,
    lineHeight: "60px",
  },
};
