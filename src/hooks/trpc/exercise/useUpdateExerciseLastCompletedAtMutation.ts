import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { pushOrReplace } from "endoh-utils"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useUpdateExerciseLastCompletedAtMutation = () => {
  const queryClient = useQueryClient()

  return trpc.exercise.updateLastCompletedAt.useMutation({
    onSuccess: async (saved) => {
      const queryKey = getQueryKey(
        trpc.exercise.myExercises,
        undefined,
        "query"
      )

      queryClient.setQueryData<(typeof saved)[]>(queryKey, (curr) =>
        pushOrReplace(curr, saved, "id")
      )

      myNotifications.success("Exercise updated")
    },
  })
}
