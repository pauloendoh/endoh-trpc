import { QueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const useMyQueryClient = () => {
  const [queryClient] = useState(new QueryClient())

  return queryClient
}
