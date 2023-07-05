import { trpc } from "../../../utils/trpc/trpc"
import { ClothingOutput } from "../exercise/types/ExerciseOutput"

export const useClothingsQuery = () => {
  return trpc.clothing.myClothings.useQuery<ClothingOutput>(undefined, {
    enabled: true,
  })
}
