import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../../trpcServer/routers/appRouter"

export type RouterOutput = inferRouterOutputs<AppRouter>
