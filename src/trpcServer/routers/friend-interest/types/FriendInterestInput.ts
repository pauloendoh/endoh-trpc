import { FriendInterest } from "@prisma/client"
import { z } from "zod"

let prismaModel: FriendInterest

export const friendInterestInputSchema = z.object({
  friendId: z.string(),
  interestId: z.string(),
  friendInterestLevel: z
    .number()
    .min(0, "Friend interest level must be between 0 and 3")
    .max(3, "Friend interest level must be between 0 and 3"),
})

export type FriendInterestInput = z.infer<typeof friendInterestInputSchema>

export const buildFriendInterestInput = (
  p?: Partial<FriendInterestInput>
): FriendInterestInput => ({
  friendId: "",
  interestId: "",
  friendInterestLevel: 0,
  ...p,
})
