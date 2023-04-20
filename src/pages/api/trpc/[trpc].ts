import * as trpcNext from "@trpc/server/adapters/next"
import { appRouter } from "../../../trpcServer/routers/appRouter"
import { createContext } from "../../../trpcServer/TrpcContext"
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
