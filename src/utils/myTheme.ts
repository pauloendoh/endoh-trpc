import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const myTheme = extendTheme({
  config,
  semanticTokens: {
    colors: {},
  },
  colors: {
    black: "#16161D",
  },
  fonts: {
    heading: `'Noto Sans', sans-serif`,
    body: `'Noto Sans', sans-serif`,
  },
})

export default myTheme
