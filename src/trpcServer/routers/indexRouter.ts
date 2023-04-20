import { router } from "../trpcServer"
import { ExerciseRouter } from "./exercise/ExerciseRouterV2"
import { userRouter } from "./userRouter"
export const appRouter = router({
  user: userRouter,
  exercise: ExerciseRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
