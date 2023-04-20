import * as trpcNext from "@trpc/server/adapters/next"
import { appRouter } from "../../../trpcServer/routers/indexRouter"
import { createContext } from "../../../trpcServer/TrpcContext"
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
