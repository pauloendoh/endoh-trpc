import { RecurrentDiaryEntry } from "@prisma/client"
import { z } from "zod"

let prismaModel: RecurrentDiaryEntry

export const recurrentEntryInputSchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  points: z.number(),
})

export type RecurrentEntryInput = z.infer<typeof recurrentEntryInputSchema>

export const buildRecurrentEntryInput = (
  p?: Partial<RecurrentEntryInput>
): RecurrentEntryInput => ({
  description: "",
  points: 0,
  ...p,
})
