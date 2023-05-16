import { ChakraProvider } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import GlobalModals from "../components/_common/modals/GlobalModals"
import { useMyQueryClient } from "../hooks/react-query/useMyQueryClient"
import myTheme from "../utils/myTheme"
import { trpc } from "../utils/trpc/trpc"
import "./global.css"

interface MyAppProps
  extends AppProps<{
    session: Session
  }> {}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props

  const myQueryClient = useMyQueryClient()

  return (
    <>
      <Head>
        <title>devfol.io</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ChakraProvider theme={myTheme}>
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
      </ChakraProvider>
    </>
  )
}

export default trpc.withTRPC(MyApp)
