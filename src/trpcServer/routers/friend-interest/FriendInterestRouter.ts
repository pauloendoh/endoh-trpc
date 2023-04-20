import { z } from "zod"
import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { FriendInterestService } from "./FriendInterestService"
import { friendInterestInputSchema } from "./types/FriendInterestInput"

const service = new FriendInterestService()

export const FriendInterestRouter = router({
  findByFriend: protectedProcedure
    .input(
      z.object({
        friendId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const friendInterests = await service.findFriendInterests(
        ctx.session.user.id,
        input.friendId
      )
      return friendInterests
    }),
  saveFriendInterest: protectedProcedure
    .input(friendInterestInputSchema)
    .mutation(async ({ ctx, input }) => {
      const friendInterest = await service.saveFriendInterest(
        ctx.session.user.id,
        input
      )
      return friendInterest
    }),
  findGroupedFriendInterests: protectedProcedure
    .input(
      z.object({
        friendId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const friendInterests = await service.findGroupedFriendInterest(
        ctx.session.user.id,
        input.friendId
      )
      return friendInterests
    }),
})
