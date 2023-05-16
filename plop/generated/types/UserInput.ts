import { User } from "@prisma/client"
import { z } from "zod"

let prismaModel: User

export const userInputSchema = z.object({
  
})

export type UserInput = z.infer<typeof userInputSchema>

export const buildUserInput = (
  p?: Partial<UserInput>
): UserInput => ({
  name: "",
  userUserLevel: 0,
  ...p,
})
