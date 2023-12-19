import { MeetingItemPayload } from "@prisma/client"
import { z } from "zod"
import { MeetingItemOutput } from "../../meeting/types/MeetingOutput"

let x: MeetingItemPayload

export const meetingItemInputSchema = z.object({
  id: z.string().optional(),
  question: z.string(),
  answer: z.string(),
  isOk: z.boolean(),
  position: z.number(),
})

export type MeetingItemInput = z.infer<typeof meetingItemInputSchema>

export const buildMeetingItemInput = (
  p?: Partial<MeetingItemInput>
): MeetingItemInput => ({
  question: "",
  answer: "",
  isOk: false,
  position: 0,
  ...p,
})

export const meetingItemOutputToInput = (
  output: MeetingItemOutput
): MeetingItemInput => {
  return {
    id: output.id,
    question: output.question,
    answer: output.answer,
    isOk: output.isOk,
    position: output.position,
  }
}
