import { Checkbox } from "@mantine/core"
import { useMemo } from "react"
import { ExerciseOutput } from "../../../../../hooks/trpc/exercise/types/ExerciseOutput"
import { useUpdateExerciseLastCompletedAtMutation } from "../../../../../hooks/trpc/exercise/useUpdateExerciseLastCompletedAtMutation"
import { exerciseIsCompleted } from "./exerciseIsCompleted/exerciseIsCompleted"

type Props = {
  exercise: ExerciseOutput
}

const ExerciseCompletedSection = ({ ...props }: Props) => {
  const checked = useMemo(() => {
    return exerciseIsCompleted(props.exercise)
  }, [props.exercise.lastCompletedAt])

  const { mutateAsync } = useUpdateExerciseLastCompletedAtMutation()

  return (
    <Checkbox
      checked={checked}
      label="Completed"
      styles={{
        label: {
          cursor: "pointer",
        },

        input: {
          cursor: "pointer !important",
        },
      }}
      onChange={async (e) => {
        await mutateAsync({
          exerciseId: props.exercise.id,
          lastCompletedAt: e.currentTarget.checked
            ? new Date().toISOString()
            : null,
        })
      }}
    />
  )
}

export default ExerciseCompletedSection
