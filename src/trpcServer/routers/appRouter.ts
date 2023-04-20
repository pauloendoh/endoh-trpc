import { router } from "../trpcServer"
import { ExerciseRouter } from "./exercise/ExerciseRouterV2"
import { FriendInterestRouter } from "./friend-interest/FriendInterestRouter"
import { FriendsRouter } from "./friend/FriendRouter"
import { InterestRouter } from "./interest/InterestRouter"
import { userRouter } from "./userRouter"
export const appRouter = router({
  user: userRouter,
  exercise: ExerciseRouter,
  friend: FriendsRouter,
  interest: InterestRouter,
  friendInterest: FriendInterestRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
