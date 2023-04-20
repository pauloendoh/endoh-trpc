import { Friend } from "@prisma/client"
import { z } from "zod"

let prismaModel: Friend

export const friendInputSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
})

export type FriendInput = z.infer<typeof friendInputSchema>

export const buildFriendInput = (p?: Partial<FriendInput>): FriendInput => ({
  name: "",
  ...p,
})
