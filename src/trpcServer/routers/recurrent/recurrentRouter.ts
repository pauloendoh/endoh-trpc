import { z } from "zod"
import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { RecurrentService } from "./RecurrentService"
import { recurrentItemInputSchema } from "./types/RecurrentItemInput"

const service = new RecurrentService()

export const recurrentRouter = router({
  myRecurrentItems: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.findRecurrentItemsByUserId(ctx.session.user.id)
    return data
  }),

  saveRecurrentItem: protectedProcedure
    .input(recurrentItemInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.saveRecurrentItem(ctx.session.user.id, input)
      return data
    }),
  deleteRecurrentItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const data = await service.deleteRecurrentItem(
        ctx.session.user.id,
        input.id
      )
      return data
    }),
})
