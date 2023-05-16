import { ColorModeScript } from "@chakra-ui/react"
import Document, { Head, Html, Main, NextScript } from "next/document"
import myTheme from "../utils/myTheme"

export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode={myTheme.config.initialColorMode} />

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
