import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { useState } from "react"
import GlobalModals from "../components/_common/modals/GlobalModals"
import { useMyQueryClient } from "../hooks/react-query/useMyQueryClient"
import { myTheme } from "../utils/mantine/myTheme"
import { trpc } from "../utils/trpc/trpc"
import "./global.css"

interface MyAppProps
  extends AppProps<{
    session: Session
  }> {}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props

  const myQueryClient = useMyQueryClient()

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <>
      <Head>
        <title>tRPC</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

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
    </>
  )
}

export default trpc.withTRPC(MyApp)
