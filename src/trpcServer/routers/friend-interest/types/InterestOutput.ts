import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../../appRouter"

type RouterOutput = inferRouterOutputs<AppRouter>

export type FriendInterestOutput =
  RouterOutput["friendInterest"]["findByFriend"][0]

export type GroupedFriendInterestsOutput =
  RouterOutput["friendInterest"]["findGroupedFriendInterests"][0]
