import { z } from "zod"
import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { DiaryService } from "./DiaryService"
import { dayConfigInputSchema } from "./types/DayConfigInput"
import { diaryEntryInputSchema } from "./types/DiaryEntryInput"
import { recurrentEntryInputSchema } from "./types/RecurrentEntryInput"

const service = new DiaryService()

export const diaryRouter = router({
  myDiaryEntries: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.findDiaryEntries(ctx.session.user.id)
    return data
  }),
  saveEntry: protectedProcedure
    .input(diaryEntryInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.saveDiaryEntry(ctx.session.user.id, input)
      return data
    }),

  myRecurrentEntries: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.findRecurrentEntries(ctx.session.user.id)
    return data
  }),

  saveRecurrentEntry: protectedProcedure
    .input(recurrentEntryInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.saveRecurrentEntry(ctx.session.user.id, input)
      return data
    }),

  deleteRecurrentEntry: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const data = await service.deleteRecurrentEntry(
        ctx.session.user.id,
        input
      )
      return data
    }),

  getOrCreateDayConfig: protectedProcedure
    .input(
      z.object({
        date: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await service.getOrCreateDayConfig(
        ctx.session.user.id,
        input.date
      )
      return data
    }),
  updateDayConfig: protectedProcedure
    .input(dayConfigInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.updateDayConfig(ctx.session.user.id, input)
      return data
    }),

  getOrCreateGlobalConfig: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.getOrCreateGlobalConfig(ctx.session.user.id)
    return data
  }),

  updateGlobalConfig: protectedProcedure
    .input(dayConfigInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.updateGlobalConfig(ctx.session.user.id, input)
      return data
    }),
})
