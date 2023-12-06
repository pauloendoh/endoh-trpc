import { IndulgencePayload } from "@prisma/client"
import { z } from "zod"
import { IndulgenceSettingsOutput } from "./IndulgenceOutput"

let x: IndulgencePayload

/**
 * id: string
    userId: string
    title: string
    points: Prisma.Decimal
    date: Date
    createdAt: Date
    updatedAt: Date
 */
export const indulgenceSettingsInputSchema = z.object({
  maxPointsPerWeek: z.number(),
  resetsOnDay: z.number(),
})

export type IndulgenceSettingsInput = z.infer<
  typeof indulgenceSettingsInputSchema
>

export const buildIndulgenceInput = (
  p?: Partial<IndulgenceSettingsInput>
): IndulgenceSettingsInput => ({
  maxPointsPerWeek: 0,
  resetsOnDay: 1,

  ...p,
})

export const indulgenceOutputToInput = (
  output: IndulgenceSettingsOutput
): IndulgenceSettingsInput => {
  return {
    maxPointsPerWeek: output.maxPointsPerWeek,
    resetsOnDay: output.resetsOnDay,
  }
}
