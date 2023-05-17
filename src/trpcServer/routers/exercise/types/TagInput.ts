import { z } from "zod"

// var x: ExerciseTag

export const tagInputSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
})

export type TagInput = z.infer<typeof tagInputSchema>

export const buildTagInput = (p?: Partial<TagInput>): TagInput => ({
  id: "",
  name: "",
  ...p,
})
