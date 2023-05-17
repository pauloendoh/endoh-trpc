import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../../../../trpcServer/routers/appRouter"

type RouterOutput = inferRouterOutputs<AppRouter>

export type ExerciseOutput = RouterOutput["exercise"]["myExercises"][0]
export type TagOutput = RouterOutput["exercise"]["findTags"][0]
