import { router } from "../trpcServer"
import { ClothingRouter } from "./clothing/ClothingRouter"
import { ExerciseRouter } from "./exercise/ExerciseRouter"
import { favoriteRouter } from "./favorite/favoriteRouter"
import { FriendInterestRouter } from "./friend-interest/FriendInterestRouter"
import { FriendsRouter } from "./friend/FriendRouter"
import { indulgenceRouter } from "./indulgence/indulgenceRouter"
import { InterestRouter } from "./interest/InterestRouter"
import { meetingRouter } from "./meeting/meetingRouter"
import { userRouter } from "./userRouter"
import { wastedRouter } from "./wasted/wastedRouter"
export const appRouter = router({
  user: userRouter,
  exercise: ExerciseRouter,
  friend: FriendsRouter,
  interest: InterestRouter,
  friendInterest: FriendInterestRouter,
  clothing: ClothingRouter,
  wasted: wastedRouter,
  favorite: favoriteRouter,
  indulgence: indulgenceRouter,
  meeting: meetingRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
