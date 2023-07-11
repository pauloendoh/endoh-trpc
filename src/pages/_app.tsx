import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { Notifications } from "@mantine/notifications"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { useEffect, useState } from "react"
import GlobalModals from "../components/_common/modals/GlobalModals"
import { useMyQueryClient } from "../hooks/react-query/useMyQueryClient"
import useScreenSizeStore from "../hooks/zustand/useScreenSizeStore"
import TypesafeI18n from "../i18n/i18n-react"
import { Locales, Translation } from "../i18n/i18n-types"
import { loadedLocales } from "../i18n/i18n-util"
import { loadFormatters } from "../i18n/i18n-util.async"
import { myTheme } from "../utils/mantine/myTheme"
import { trpc } from "../utils/trpc/trpc"
import "./global.css"

interface MyAppProps
  extends AppProps<{
    session: Session
    i18n?: {
      locale: Locales
      dictionary: any
    }
  }> {}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props

  const myQueryClient = useMyQueryClient()

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark")

  const { height, width } = useViewportSize()
  const [setScreenHeight, setScreenWidth] = useScreenSizeStore((s) => [
    s.setScreenHeight,
    s.setScreenWidth,
  ])
  useEffect(() => {
    setScreenHeight(height)
    setScreenWidth(width)
  }, [height, width])

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  const locale = pageProps.i18n?.locale || "en"
  const dictionary = pageProps.i18n?.dictionary

  if (locale && dictionary) {
    loadedLocales[locale] = dictionary as Translation
    loadFormatters(locale)
  }

  return (
    <>
      <Head>
        <title>tRPC</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <TypesafeI18n locale={locale}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              ...myTheme,
              colorScheme,
            }}
          >
            <Notifications
              position="bottom-center"
              // zIndex={zIndexes.notification}
            />

            <SessionProvider session={props.pageProps.session}>
              <QueryClientProvider client={myQueryClient}>
                <Head>
                  <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                  />
                </Head>

                <Component {...pageProps} />
                <GlobalModals />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </SessionProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </TypesafeI18n>
    </>
  )
}

export default trpc.withTRPC(MyApp)
