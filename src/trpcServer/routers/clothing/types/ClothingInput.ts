import { Clothing, ClothingType } from "@prisma/client"
import { z } from "zod"

type X = Clothing
export const clothingInputSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string(),
  rating: z.number().min(1).max(5),
  minDegree: z.number(),
  maxDegree: z.number(),

  type: z.nativeEnum(ClothingType).optional(),
})

export type ClothingInput = z.infer<typeof clothingInputSchema>

export const buildClothingInput = (
  p?: Partial<ClothingInput>
): ClothingInput => ({
  imageUrl: "",
  rating: 5,
  minDegree: 0,
  maxDegree: 30,
  type: "home",
  ...p,
})
