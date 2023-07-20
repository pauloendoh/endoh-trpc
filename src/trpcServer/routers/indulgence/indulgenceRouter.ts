import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { IndulgenceService } from "./IndulgenceService"
import { indulgenceInputSchema } from "./types/IndulgenceInput"

const service = new IndulgenceService()

export const indulgenceRouter = router({
  myIndulgences: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.findIndulgencesByUserId(ctx.session.user.id)
    return data
  }),

  saveIndulgence: protectedProcedure
    .input(indulgenceInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.saveIndulgence(ctx.session.user.id, input)
      return data
    }),
})
