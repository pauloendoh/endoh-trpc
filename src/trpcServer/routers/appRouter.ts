import { router } from "../trpcServer"
import { ClothingRouter } from "./clothing/ClothingRouter"
import { ExerciseRouter } from "./exercise/ExerciseRouter"
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
  clothing: ClothingRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
