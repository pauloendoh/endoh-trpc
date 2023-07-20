import { IndulgencePayload } from "@prisma/client"
import { z } from "zod"
import { IndulgenceOutput } from "./IndulgenceOutput"

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
export const indulgenceInputSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  points: z.number(),
  date: z.string().datetime(),
})

export type IndulgenceInput = z.infer<typeof indulgenceInputSchema>

export const buildIndulgenceInput = (
  p?: Partial<IndulgenceInput>
): IndulgenceInput => ({
  title: "",
  points: 0,
  date: new Date().toISOString(),

  ...p,
})

export const indulgenceOutputToInput = (
  output: IndulgenceOutput
): IndulgenceInput => {
  return {
    id: output.id,
    title: output.title,
    points: Number(output.points),
    date: output.date,
  }
}
