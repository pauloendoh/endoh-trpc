import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../../appRouter"

type RouterOutput = inferRouterOutputs<AppRouter>

export type FavoriteOutput = RouterOutput["favorite"]["myFavorites"][0]
