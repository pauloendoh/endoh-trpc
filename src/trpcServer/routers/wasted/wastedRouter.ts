import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { wastedInputSchema } from "./types/WastedInput"
import { WastedService } from "./WastedService"

const service = new WastedService()

export const wastedRouter = router({
  myWasteds: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.findWastedsByUserId(ctx.session.user.id)
    return data
  }),

  saveWasted: protectedProcedure
    .input(wastedInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.saveWasted(ctx.session.user.id, input)
      return data
    }),

  averageDailyWaste: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.getAverageDailyWaste(ctx.session.user.id)
    return data
  }),

  extraWastedLast30Days: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.getExtraWastedLast30Days(ctx.session.user.id)
    return data
  }),
})
