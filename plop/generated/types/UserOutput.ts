import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../../appRouter"

type RouterOutput = inferRouterOutputs<AppRouter>

export type UserOutput = RouterOutput["user"]["myUsers"][0]
