import { DiaryEntry } from "@prisma/client"
import { z } from "zod"

let prismaModel: DiaryEntry

export const diaryEntryInputSchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  points: z.number(),
  datetime: z.string(),
  isFromYesterday: z.boolean().optional(),
  hourOffset: z.number().optional(),
})

export type DiaryEntryInput = z.infer<typeof diaryEntryInputSchema>

export const buildDiaryEntryInput = (
  p?: Partial<DiaryEntryInput>
): DiaryEntryInput => ({
  description: "",
  points: 0,
  datetime: "",
  hourOffset: 0,
  ...p,
})
