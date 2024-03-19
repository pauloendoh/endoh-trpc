import { Idea, IdeaStatus } from "@prisma/client"
import { z } from "zod"

let prismaModel: Idea

export const ideaInputSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  complexity: z.number(),
  status: z.nativeEnum(IdeaStatus),
})

export type IdeaInput = z.infer<typeof ideaInputSchema>

export const buildIdeaInput = (p?: Partial<IdeaInput>): IdeaInput => ({
  title: "",
  description: "",
  complexity: 1,
  status: "WOULD_NOW",
  ...p,
})
