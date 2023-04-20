import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../../appRouter"

type RouterOutput = inferRouterOutputs<AppRouter>

export type InterestOutput = RouterOutput["interest"]["myInterests"][0]
