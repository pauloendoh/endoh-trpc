import { QueryClient } from "@tanstack/react-query"
import { TRPCClientErrorLike } from "@trpc/client"
import { useState } from "react"
import { AppRouter } from "../../trpcServer/routers/appRouter"
import { useMyNotifications } from "../useMyNotifications"

export const useMyQueryClient = () => {
  const { setErrorMessage } = useMyNotifications()
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        mutations: {
          onError: (err) => {
            const error = err as TRPCClientErrorLike<AppRouter>
            const fieldErrors = error.data?.zodError?.fieldErrors || {}

            Object.values(fieldErrors).forEach((value) => {
              setErrorMessage(`${value?.[0]}`)
            })
          },
        },
      },
    })
  )

  return queryClient
}
