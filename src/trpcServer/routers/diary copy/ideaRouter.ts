import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { IdeaService } from "./IdeaService"
import { ideaInputSchema } from "./types/IdeaInput"

const service = new IdeaService()

export const ideaRouter = router({
  myIdeas: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.findUserIdeas(ctx.session.user.id)
    return data
  }),
  saveIdea: protectedProcedure
    .input(ideaInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.saveIdea(ctx.session.user.id, input)
      return data
    }),
})
