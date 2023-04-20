import { MantineThemeOverride } from "@mantine/core"

export const theme: MantineThemeOverride = {
  colorScheme: "dark",

  fontFamily: `'Noto Sans', sans-serif;`, // imported at global.css
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
  },

  primaryColor: "primary",
  colors: {
    primary: [
      "#e6fffa",
      "#b2f5ea",
      "#81e6d9",
      "#4fd1c5",
      "#38b2ac",
      "#319795",
      "#2c7a7b",
      "#285e61",
      "#234e52",
      "#1d4044",
    ],
    secondary: [
      "#fff5f5",
      "#fed7d7",
      "#feb2b2",
      "#fc8181",
      "#f56565",
      "#e53e3e",
      "#c53030",
      "#9b2c2c",
      "#822727",
      "#63171b",
    ],
  },
}
