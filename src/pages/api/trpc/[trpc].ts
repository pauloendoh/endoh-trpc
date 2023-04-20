import { appRouter } from "@/trpcServer/routers/_app"
import { createContext } from "@/trpcServer/TrpcContext"
import * as trpcNext from "@trpc/server/adapters/next"
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
