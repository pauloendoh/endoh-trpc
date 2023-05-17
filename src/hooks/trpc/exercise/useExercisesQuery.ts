import { trpc } from "../../../utils/trpc/trpc"
import { ExerciseOutput } from "./types/ExerciseOutput"

export const useExercisesQuery = () => {
  return trpc.exercise.myExercises.useQuery<ExerciseOutput>(undefined, {
    enabled: true,
  })
}
