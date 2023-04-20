import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { routes } from "../hooks/trpc/myTrpc"
import "./global.css"

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

      <ChakraProvider>
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
      </ChakraProvider>
    </>
  )
}

export default routes.withTRPC(MyApp)
