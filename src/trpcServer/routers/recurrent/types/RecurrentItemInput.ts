import { RecurrentItemPayload } from "@prisma/client"
import { DateTime } from "luxon"
import { z } from "zod"
import { RecurrentItemOutput } from "./RecurrentItemOutput"

let x: RecurrentItemPayload

export const recurrentItemInputSchema = z.object({
  id: z.string().optional(),

  description: z.string(),
  everyNDays: z.number(),
  nextDate: z.string(),
})

export type RecurrentItemInput = z.infer<typeof recurrentItemInputSchema>

export const buildRecurrentItemInput = (
  p?: Partial<RecurrentItemInput>
): RecurrentItemInput => ({
  description: "",
  everyNDays: 1,
  nextDate: DateTime.now().startOf("day").toISO(),

  ...p,
})

export const recurrentItemOutputToInput = (
  output: RecurrentItemOutput
): RecurrentItemInput => {
  return {
    id: output.id,

    description: output.description,
    everyNDays: output.everyNDays,
    nextDate: output.nextDate,
  }
}
