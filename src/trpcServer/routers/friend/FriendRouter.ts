import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { FriendService } from "./FriendService"
import { friendInputSchema } from "./types/FriendInput"

const service = new FriendService()

export const FriendsRouter = router({
  myFriends: protectedProcedure.query(async ({ ctx }) => {
    const friends = await service.findFriends(ctx.session.user.id)
    return friends
  }),
  saveFriend: protectedProcedure
    .input(friendInputSchema)
    .mutation(async ({ ctx, input }) => {
      const friend = await service.saveFriend(ctx.session.user.id, input)
      return friend
    }),
})
