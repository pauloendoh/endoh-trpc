import { ExerciseOutput } from "../../../../../../hooks/trpc/exercise/types/ExerciseOutput"

export function exerciseIsCompleted(exercise: ExerciseOutput) {
  if (!exercise.lastCompletedAt) {
    return false
  }

  // within last 6 hours = checked
  const lastCompletedAt = new Date(exercise.lastCompletedAt)
  const now = new Date()
  const diff = now.getTime() - lastCompletedAt.getTime()
  const diffInHours = diff / (1000 * 3600)
  return diffInHours < 6
}
