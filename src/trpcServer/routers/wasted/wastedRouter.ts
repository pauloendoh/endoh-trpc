import { protectedProcedure } from "../../middlewares/protectedProcedure";
import { router } from "../../trpcServer";
import { WastedService } from "./WastedService";
import { wastedInputSchema } from "./types/WastedInput";

const service = new WastedService();

export const wastedRouter = router({
  myWasteds: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.findWastedsByUserId(ctx.session.user.id);
    return data;
  }),

  saveWasted: protectedProcedure
    .input(wastedInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.saveWasted(ctx.session.user.id, input);
      return data;
    }),
});
