import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useDeleteExerciseMutation = () => {
  const queryClient = useQueryClient()

  return trpc.exercise.deleteExercise.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(
        trpc.exercise.myExercises,
        undefined,
        "query"
      )

      queryClient.setQueryData<(typeof saved)[]>(queryKey, (curr) => {
        if (curr) {
          return curr.filter((item) => item.id !== input)
        }
      })

      myNotifications.success("Exercise deleted!")
    },
  })
}
