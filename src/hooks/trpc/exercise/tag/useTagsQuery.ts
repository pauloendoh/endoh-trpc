import { trpc } from "../../../../utils/trpc/trpc"
import { TagOutput } from "../types/ExerciseOutput"

export const useTagsQuery = () => {
  return trpc.exercise.findTags.useQuery<TagOutput>(undefined, {
    enabled: true,
  })
}
