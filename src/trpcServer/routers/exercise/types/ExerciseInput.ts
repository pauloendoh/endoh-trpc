import { z } from "zod"
import { ExerciseOutput } from "../../../../hooks/trpc/exercise/types/ExerciseOutput"

export const exerciseInputSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  pump: z
    .number()
    .min(0, "Pump must be between 0 and 5")
    .max(5, "Pump must be between 0 and 5"),
  like: z
    .number()
    .min(0, "Like must be between 0 and 5")
    .max(5, "Like must be between 0 and 5"),
  imageUrl: z.string().optional(),
  tagIds: z.array(z.string()),
})

export type ExerciseInput = z.infer<typeof exerciseInputSchema>

export const buildExerciseInput = (
  p?: Partial<ExerciseInput>
): ExerciseInput => ({
  title: "",
  description: "",
  pump: 0,
  like: 0,
  imageUrl: "",
  tagIds: [],
  ...p,
})

export function exerciseOutputToInput(output: ExerciseOutput): ExerciseInput {
  const data: ExerciseInput = {
    id: output.id,
    title: output.title,
    description: output.description,
    pump: output.pump,
    like: output.like,
    imageUrl: output.imageUrl || undefined,
    tagIds: output.tags.map((tag) => tag.id),
  }

  // validate
  const result = exerciseInputSchema.safeParse(data)
  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}
