import { myTrpc } from "@/hooks/trpc/myTrpc"
import { theme } from "@/theme"
import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import createEmotionCache from "../createEmotionCache"
import "./global.css"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps
  extends AppProps<{
    session: Session
  }> {}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props

  const queryClient = new QueryClient()

  return (
    <>
      <Head>
        <title>devfol.io</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider>
          <SessionProvider session={props.pageProps.session}>
            <QueryClientProvider client={queryClient}>
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>

              <Component {...pageProps} />
            </QueryClientProvider>
          </SessionProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}

export default myTrpc.withTRPC(MyApp)
