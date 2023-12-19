import { z } from "zod"
import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { MeetingService } from "./MeetingService"
import { meetingItemInputSchema } from "./types/MeetingItemInput"

const service = new MeetingService()

export const meetingRouter = router({
  myItems: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.findMeetingItemsByUserId(ctx.session.user.id)
    return data
  }),

  saveMeetingItem: protectedProcedure
    .input(meetingItemInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.saveMeetingItem(ctx.session.user.id, input)
      return data
    }),
  deleteMeetingItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const data = await service.deleteMeetingItem(
        ctx.session.user.id,
        input.id
      )
      return data
    }),
})
