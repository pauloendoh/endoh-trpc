import { Interest } from "@prisma/client"
import { z } from "zod"

let prismaModel: Interest

export const interestInputSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  userInterestLevel: z
    .number()
    .min(0, "User interest must be between 0 and 3")
    .max(3, "User interest must be between 0 and 3"),
})

export type InterestInput = z.infer<typeof interestInputSchema>

export const buildInterestInput = (
  p?: Partial<InterestInput>
): InterestInput => ({
  name: "",
  userInterestLevel: 0,
  ...p,
})
