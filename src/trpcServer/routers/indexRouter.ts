import { router } from "../trpcServer"
import { userRouter } from "./userRouter"
export const appRouter = router({
  user: userRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
