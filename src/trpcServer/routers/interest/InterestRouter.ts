import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { InterestService } from "./InterestService"
import { interestInputSchema } from "./types/InterestInput"

const service = new InterestService()

export const InterestRouter = router({
  myInterests: protectedProcedure.query(async ({ ctx }) => {
    const interests = await service.findInterests(ctx.session.user.id)
    return interests
  }),
  saveInterest: protectedProcedure
    .input(interestInputSchema)
    .mutation(async ({ ctx, input }) => {
      const interest = await service.saveInterest(ctx.session.user.id, input)
      return interest
    }),
})
