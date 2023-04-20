import { trpc } from "../../../utils/trpc/trpc"

export const useExercisesQuery = () => {
  return trpc.exercise.myExercises.useQuery(undefined, {
    enabled: true,
  })
}
