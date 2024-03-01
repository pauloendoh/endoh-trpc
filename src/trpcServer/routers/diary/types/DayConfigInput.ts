import { DiaryDayConfig } from "@prisma/client"
import { z } from "zod"

let prismaModel: DiaryDayConfig

export const dayConfigInputSchema = z.object({
  pointsPerHour: z.number(),
  availableHours: z.number(),
  date: z.string(),
  goalHour: z.number(),
})

export type DayConfigInput = z.infer<typeof dayConfigInputSchema>

export const buildDayConfigInput = (
  p?: Partial<DayConfigInput>
): DayConfigInput => ({
  availableHours: 16,
  date: new Date().toISOString().split("T")[0],
  pointsPerHour: 2.5,
  goalHour: 21,
  ...p,
})
