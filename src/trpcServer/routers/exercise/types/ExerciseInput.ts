import { z } from "zod"

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
  ...p,
})
