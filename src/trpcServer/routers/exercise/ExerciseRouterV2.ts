import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { ExerciseService } from "./ExerciseService"
import { exerciseInputSchema } from "./types/ExerciseInput"
import { tagInputSchema } from "./types/TagInput"

const service = new ExerciseService()

export const ExerciseRouter = router({
  myExercises: protectedProcedure.query(async ({ ctx }) => {
    const exercises = await service.findExercises(ctx.session.user.id)
    return exercises
  }),
  saveExercise: protectedProcedure
    .input(exerciseInputSchema)
    .mutation(async ({ ctx, input }) => {
      const exercise = await service.saveExercise(ctx.session.user.id, input)
      return exercise
    }),
  saveTag: protectedProcedure
    .input(tagInputSchema)
    .mutation(async ({ ctx, input }) => {
      const tag = await service.saveTag(ctx.session.user.id, input)
      return tag
    }),

  findTags: protectedProcedure.query(async ({ ctx }) => {
    const tags = await service.findTags(ctx.session.user.id)
    return tags
  }),
})
